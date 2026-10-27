
const API_URL = "https://www.kamis.or.kr/service/price/xml.do";
const CERT_KEY = process.env.KAMIS_CERT_KEY;
const CERT_ID = process.env.KAMIS_CERT_ID;

if (!CERT_KEY || !CERT_ID) {
  throw new Error("KAMIS 인증정보가 설정되지 않았습니다.");
}

const categories = [
  { code: "100", name: "식량작물" },
  { code: "200", name: "채소류" },
  { code: "300", name: "특용작물" },
  { code: "400", name: "과일류" },
  { code: "500", name: "축산물" },
  { code: "600", name: "수산물" }
];

// 가격 문자열을 숫자로 변환
function toPrice(value) {
  if (value == null) return null;

  const text = String(value).trim();

  if (!text || text === "-" || text === "0") {
    return null;
  }

  const number = Number(text.replace(/,/g, ""));

  return Number.isFinite(number) && number > 0
    ? number
    : null;
}

// 가격 변동률 계산(%)
function changeRate(current, previous) {
  if (
    current == null ||
    previous == null ||
    previous === 0
  ) {
    return null;
  }

  return Math.round(
    ((current - previous) / previous) * 1000
  ) / 10;
}

// 한국 날짜 기준으로 조회일 생성
function getKoreaDate() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date());

  const values = Object.fromEntries(
    parts.map(part => [part.type, part.value])
  );

  return `${values.year}-${values.month}-${values.day}`;
}

// 날짜 이동
function shiftKoreaDate(dateString, offsetDays) {
  const date = new Date(`${dateString}T12:00:00Z`);

  date.setUTCDate(date.getUTCDate() + offsetDays);

  return date.toISOString().slice(0, 10);
}

// 지정한 날짜의 KAMIS 가격 조회
async function fetchCategoryForDate(category, queryDate) {
  const params = new URLSearchParams({
    action: "dailyPriceByCategoryList",
    p_cert_key: CERT_KEY,
    p_cert_id: CERT_ID,
    p_returntype: "json",
    p_product_cls_code: "01",
    p_item_category_code: category.code,
    p_country_code: "1101",
    p_regday: queryDate,
    p_convert_kg_yn: "Y"
  });

  const response = await fetch(`${API_URL}?${params}`);

  if (!response.ok) {
    throw new Error(
      `${category.name} (${queryDate}): KAMIS HTTP ${response.status}`
    );
  }

  const responseText = await response.text();

  let json;

  try {
    json = JSON.parse(responseText);
  } catch {
    throw new Error(
      `${category.name} (${queryDate}): KAMIS 응답이 JSON 형식이 아닙니다.`
    );
  }

  const result = json.data;

  if (
    !result ||
    typeof result !== "object" ||
    Array.isArray(result)
  ) {
    throw new Error(
      `${category.name} (${queryDate}): KAMIS data 객체를 확인할 수 없습니다.`
    );
  }

  const errorCode = String(result.error_code ?? "");

  if (errorCode !== "000") {
    throw new Error(
      `${category.name} (${queryDate}): KAMIS 오류 코드 ${errorCode || "확인 불가"}`
    );
  }

  if (!Array.isArray(result.item)) {
    throw new Error(
      `${category.name} (${queryDate}): KAMIS 상품 목록이 배열이 아닙니다.`
    );
  }

  return result.item.map(row => {
    const current = toPrice(row.dpr1);
    const previousDay = toPrice(row.dpr2);
    const weekAgo = toPrice(row.dpr3);
    const yearAgo = toPrice(row.dpr6);

    // 오늘 가격이 없으면 전일 가격을 참고 가격으로 사용
    const displayPrice = current ?? previousDay;

    // 표시 가격의 실제 조사일
    const actualPriceDate =
      current != null
        ? (row.day1 || queryDate)
        : previousDay != null
          ? (row.day2 || null)
          : null;

    return {
      name: row.item_name ?? "",
      itemCode: row.item_code ?? "",
      variety: row.kind_name ?? "",
      varietyCode: row.kind_code ?? "",
      grade: row.rank ?? "",
      unit: row.unit ?? "",
      category: category.name,

      price: displayPrice,
      priceToday: current,
      pricePreviousDay: previousDay,
      priceWeekAgo: weekAgo,
      priceYearAgo: yearAgo,

      pctDay:
        current == null
          ? null
          : changeRate(current, previousDay),

      pctWeek: changeRate(displayPrice, weekAgo),
      pctYear: changeRate(displayPrice, yearAgo),

      asOf: actualPriceDate,
      priceDate: actualPriceDate,

      priceBasis:
        current != null
          ? "당일 가격"
          : previousDay != null
            ? "최근 확인된 가격"
            : "가격 정보 없음",

      previousDayLabel: row.day2 ?? null,
      weekAgoLabel: row.day3 ?? null,
      yearAgoLabel: row.day6 ?? null
    };
  }).filter(item => item.name && item.price != null);
}

// 가격이 없으면 최근 7일간 날짜를 바꿔 재조회
async function fetchCategory(category) {
  const today = getKoreaDate();

  for (let offset = 0; offset <= 7; offset++) {
    const queryDate = shiftKoreaDate(today, -offset);

    const items = await fetchCategoryForDate(
      category,
      queryDate
    );

    if (items.length > 0) {
      const actualDates = items
        .map(item => item.priceDate)
        .filter(Boolean)
        .sort();

      const oldest = actualDates[0] || queryDate;
      const newest = actualDates[actualDates.length - 1] || queryDate;

      console.log(
        `${category.name}: ${items.length}개 ` +
        `(${queryDate} 조회, 실제 조사일 ${oldest}` +
        `${oldest === newest ? "" : `~${newest}`})`
      );

      return items;
    }

    console.log(
      `${category.name}: ${queryDate} 가격 없음, 이전 날짜 재조회`
    );
  }

  console.log(`${category.name}: 최근 8일간 유효한 가격 없음`);

  return [];
}

// 전체 카테고리 조회 및 JSON 생성
async function main() {
  const allItems = [];

  for (const category of categories) {
    const items = await fetchCategory(category);
    allItems.push(...items);
  }

  // 유효한 가격이 하나도 없으면 기존 JSON을 덮어쓰지 않음
  if (allItems.length === 0) {
    throw new Error(
      "유효한 가격 데이터가 없습니다. 기존 JSON을 유지합니다."
    );
  }

  const output = {
    success: true,
    source: "KAMIS",
    updatedAt: new Date().toISOString(),
    priceType: "retail",
    region: "서울",
    unitPolicy: "KAMIS kg 환산 요청",
    items: allItems
  };

  const fs = await import("node:fs/promises");

  await fs.mkdir("data", {
    recursive: true
  });

  await fs.writeFile(
    "data/prices.json",
    JSON.stringify(output, null, 2) + "\n",
    "utf8"
  );

  console.log(
    `총 ${allItems.length}개 가격 저장 완료`
  );
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
