
// 오늘뭐먹지 - 월별 제철 상품 데이터
// months: 상품을 노출할 월 (1~12)
// category: 농산물 또는 수산물

const seasonalFoodItems = [
  // ───── 1~4월 과일 ─────
  { name: "딸기", category: "농산물", months: [1, 2, 3, 4], description: "겨울부터 봄까지 즐기는 과일" },
  { name: "감귤", category: "농산물", months: [11, 12, 1, 2], description: "겨울철 대표 감귤류" },
  { name: "한라봉", category: "농산물", months: [1, 2, 3], description: "향이 진한 만감류" },
  { name: "천혜향", category: "농산물", months: [2, 3, 4], description: "향긋하고 과즙이 풍부한 만감류" },
  { name: "참외", category: "농산물", months: [4, 5, 6, 7], description: "봄부터 여름까지 즐기는 과일" },

  // ───── 5~8월 과일 ─────
  { name: "수박", category: "농산물", months: [6, 7, 8], description: "여름철 대표 과일" },
  { name: "복숭아", category: "농산물", months: [6, 7, 8], description: "향긋한 여름 과일" },
  { name: "자두", category: "농산물", months: [6, 7, 8], description: "새콤달콤한 여름 과일" },
  { name: "포도", category: "농산물", months: [7, 8, 9, 10], description: "여름부터 가을까지 즐기는 과일" },

  // ───── 9~12월 과일 ─────
  { name: "사과", category: "농산물", months: [9, 10, 11, 12, 1], description: "가을부터 겨울까지 대표 과일" },
  { name: "배", category: "농산물", months: [9, 10, 11, 12], description: "수분이 풍부한 가을 과일" },
  { name: "감", category: "농산물", months: [9, 10, 11, 12], description: "가을철 대표 과일" },
  { name: "유자", category: "농산물", months: [10, 11, 12], description: "향이 풍부한 늦가을 과일" },

  // ───── 채소·나물·곡류 ─────
  { name: "봄동", category: "농산물", months: [1, 2, 3], description: "겨울을 지나 봄에 즐기는 배추류" },
  { name: "시금치", category: "농산물", months: [1, 2, 11, 12], description: "겨울철 단맛이 좋은 잎채소" },
  { name: "무", category: "농산물", months: [1, 2, 10, 11, 12], description: "국과 반찬에 두루 쓰이는 뿌리채소" },
  { name: "배추", category: "농산물", months: [1, 2, 10, 11, 12], description: "김치와 국에 활용하는 채소" },
  { name: "연근", category: "농산물", months: [1, 2, 11, 12], description: "조림과 볶음에 활용하는 뿌리채소" },
  { name: "냉이", category: "농산물", months: [2, 3, 4], description: "봄 향이 좋은 대표 나물" },
  { name: "달래", category: "농산물", months: [2, 3, 4], description: "알싸한 향이 특징인 봄나물" },
  { name: "쑥", category: "농산물", months: [3, 4], description: "국과 떡 등에 활용하는 봄나물" },
  { name: "미나리", category: "농산물", months: [3, 4, 5], description: "향긋한 봄 채소" },
  { name: "두릅", category: "농산물", months: [4, 5], description: "봄철 대표 산나물" },
  { name: "참나물", category: "농산물", months: [3, 4, 5], description: "향긋한 봄나물" },
  { name: "취나물", category: "농산물", months: [3, 4, 5], description: "봄철에 즐기는 나물" },
  { name: "아스파라거스", category: "농산물", months: [4, 5, 6], description: "볶음과 구이에 어울리는 채소" },
  { name: "완두콩", category: "농산물", months: [4, 5, 6], description: "봄부터 초여름까지 즐기는 콩류" },
  { name: "오이", category: "농산물", months: [5, 6, 7, 8], description: "수분이 풍부한 여름 채소" },
  { name: "토마토", category: "농산물", months: [5, 6, 7, 8], description: "생식과 조리에 두루 쓰이는 채소" },
  { name: "매실", category: "농산물", months: [5, 6], description: "청과 음료 등에 활용하는 과실" },
  { name: "마늘종", category: "농산물", months: [4, 5, 6], description: "볶음 반찬에 활용하는 채소" },
  { name: "양파", category: "농산물", months: [5, 6, 7], description: "다양한 요리의 기본 재료" },
  { name: "감자", category: "농산물", months: [5, 6, 7], description: "초여름부터 수확하는 뿌리작물" },
  { name: "옥수수", category: "농산물", months: [6, 7, 8], description: "여름철 대표 간식" },
  { name: "풋고추", category: "농산물", months: [6, 7, 8, 9], description: "여름철 반찬에 활용하는 고추" },
  { name: "애호박", category: "농산물", months: [6, 7, 8, 9], description: "볶음과 찌개에 활용하는 채소" },
  { name: "고구마", category: "농산물", months: [8, 9, 10, 11], description: "늦여름부터 가을까지 수확하는 작물" },
  { name: "밤", category: "농산물", months: [9, 10, 11], description: "가을철 대표 견과류" },
  { name: "땅콩", category: "농산물", months: [9, 10], description: "가을에 수확하는 견과 작물" },
  { name: "단호박", category: "농산물", months: [8, 9, 10, 11], description: "달콤한 맛이 특징인 호박" },
  { name: "버섯류", category: "농산물", months: [9, 10, 11], description: "가을 요리에 활용하는 버섯" },
  { name: "브로콜리", category: "농산물", months: [10, 11, 12, 1, 2], description: "찜과 볶음에 활용하는 채소" },
  { name: "늙은호박", category: "농산물", months: [10, 11, 12], description: "죽과 국 등에 활용하는 호박" },

  // ───── 수산물 ─────
  { name: "굴", category: "수산물", months: [10, 11, 12, 1, 2], description: "찬 계절에 많이 찾는 패류" },
  { name: "홍합", category: "수산물", months: [10, 11, 12, 1, 2], description: "국물 요리에 어울리는 패류" },
  { name: "꼬막", category: "수산물", months: [11, 12, 1, 2], description: "겨울철 별미로 즐기는 패류" },
  { name: "과메기", category: "수산물", months: [11, 12, 1, 2], description: "겨울철 대표 수산 가공식품" },
  { name: "명태", category: "수산물", months: [12, 1, 2], description: "탕과 찜에 활용하는 생선" },
  { name: "대구", category: "수산물", months: [11, 12, 1, 2], description: "겨울철 탕 요리에 많이 쓰이는 생선" },
  { name: "아귀", category: "수산물", months: [12, 1, 2, 3], description: "찜과 탕으로 즐기는 생선" },
  { name: "삼치", category: "수산물", months: [10, 11, 12, 1, 2], description: "구이로 즐기기 좋은 생선" },
  { name: "바지락", category: "수산물", months: [2, 3, 4, 5], description: "국과 칼국수에 활용하는 조개" },
  { name: "도미", category: "수산물", months: [2, 3, 4], description: "봄철에 많이 찾는 흰살생선" },
  { name: "주꾸미", category: "수산물", months: [3, 4], description: "봄철 대표 수산물" },
  { name: "도다리", category: "수산물", months: [3, 4, 5], description: "봄철에 많이 찾는 생선" },
  { name: "멍게", category: "수산물", months: [3, 4, 5], description: "바다 향이 특징인 해산물" },
  { name: "소라", category: "수산물", months: [3, 4, 5], description: "삶거나 무쳐 먹는 해산물" },
  { name: "키조개", category: "수산물", months: [3, 4, 5], description: "관자를 구이와 볶음으로 즐기는 패류" },
  { name: "꽃게", category: "수산물", months: [4, 5, 8, 9, 10], description: "봄과 가을에 많이 찾는 갑각류" },
  { name: "병어", category: "수산물", months: [4, 5, 6], description: "구이와 조림으로 즐기는 생선" },
  { name: "장어", category: "수산물", months: [5, 6, 7, 8], description: "여름철 보양식으로 많이 찾는 수산물" },
  { name: "갑오징어", category: "수산물", months: [4, 5, 6], description: "봄부터 초여름에 찾는 두족류" },
  { name: "다슬기", category: "수산물", months: [5, 6, 7], description: "국 등에 활용하는 민물 고둥" },
  { name: "갈치", category: "수산물", months: [6, 7, 8, 9, 10], description: "구이와 조림으로 즐기는 생선" },
  { name: "농어", category: "수산물", months: [6, 7, 8], description: "여름철에 많이 찾는 흰살생선" },
  { name: "전복", category: "수산물", months: [6, 7, 8], description: "찜과 죽 등에 활용하는 패류" },
  { name: "성게", category: "수산물", months: [6, 7, 8], description: "여름철에 많이 찾는 해산물" },
  { name: "민어", category: "수산물", months: [6, 7, 8], description: "여름철 보양식으로 알려진 생선" },
  { name: "문어", category: "수산물", months: [7, 8], description: "숙회와 볶음에 활용하는 두족류" },
  { name: "오징어", category: "수산물", months: [7, 8, 9], description: "볶음과 무침 등에 활용하는 수산물" },
  { name: "대하", category: "수산물", months: [9, 10], description: "가을철 대표 새우류" },
  { name: "전어", category: "수산물", months: [8, 9, 10], description: "가을철 대표 생선" },
  { name: "고등어", category: "수산물", months: [9, 10, 11], description: "구이와 조림으로 즐기는 등푸른생선" },
  { name: "낙지", category: "수산물", months: [9, 10, 11], description: "볶음과 탕에 활용하는 두족류" },
  { name: "새우", category: "수산물", months: [9, 10, 11], description: "구이와 볶음에 활용하는 갑각류" },
  { name: "방어", category: "수산물", months: [11, 12, 1, 2], description: "겨울철에 많이 찾는 생선" },
  { name: "가리비", category: "수산물", months: [11, 12, 1, 2], description: "구이와 찜으로 즐기는 패류" },
  { name: "도루묵", category: "수산물", months: [11, 12], description: "늦가을과 겨울에 많이 찾는 생선" },
  { name: "임연수어", category: "수산물", months: [2, 3, 4], description: "구이로 즐기기 좋은 생선" },
  { name: "숭어", category: "수산물", months: [3, 4], description: "봄철에 찾는 생선" }
];


function getFoodEmoji(name, category) {
  const foodName = name.replace(/\s/g, "");

  const emojiRules = [
    // 과일
    [["딸기"], "🍓"],
    [["사과"], "🍎"],
    [["배"], "🍐"],
    [["포도"], "🍇"],
    [["귤", "감귤", "한라봉", "천혜향", "레드향", "오렌지"], "🍊"],
    [["레몬", "유자"], "🍋"],
    [["수박"], "🍉"],
    [["참외"], "🍈"],
    [["복숭아"], "🍑"],
    [["체리", "앵두"], "🍒"],
    [["바나나"], "🍌"],
    [["파인애플"], "🍍"],
    [["망고"], "🥭"],
    [["키위"], "🥝"],
    [["감", "홍시", "곶감"], "🍅"],
    [["블루베리", "오디"], "🫐"],
    [["밤"], "🌰"],

    // 채소
    [["배추", "양배추"], "🥬"],
    [["상추", "깻잎", "시금치", "쑥갓", "미나리"], "🥬"],
    [["무", "당근", "연근", "우엉"], "🥕"],
    [["고구마"], "🍠"],
    [["감자"], "🥔"],
    [["양파"], "🧅"],
    [["마늘"], "🧄"],
    [["생강"], "🫚"],
    [["대파", "쪽파", "부추"], "🌿"],
    [["오이"], "🥒"],
    [["호박", "애호박", "단호박"], "🎃"],
    [["토마토", "방울토마토"], "🍅"],
    [["옥수수"], "🌽"],
    [["브로콜리"], "🥦"],
    [["버섯", "표고", "송이", "느타리", "팽이"], "🍄"],
    [["고추", "파프리카"], "🌶️"],
    [["피망"], "🫑"],
    [["콩", "강낭콩"], "🫘"],
    [["완두"], "🫛"],
    [["죽순", "아스파라거스"], "🌱"],

    // 곡류·견과류
    [["쌀", "보리", "현미", "귀리"], "🌾"],
    [["깨", "참깨", "들깨"], "🌱"],
    [["땅콩", "호두", "잣"], "🥜"],

    // 수산물
    [["고등어"], "🐟"],
    [["갈치"], "🐟"],
    [["명태", "대구"], "🐟"],
    [["연어"], "🐟"],
    [["꽁치"], "🐟"],
    [["오징어"], "🦑"],
    [["문어"], "🐙"],
    [["낙지"], "🐙"],
    [["새우", "대하", "꽃새우"], "🦐"],
    [["게", "꽃게", "대게", "킹크랩"], "🦀"],
    [["굴"], "🦪"],
    [["전복"], "🐚"],
    [["조개", "바지락", "홍합", "가리비"], "🐚"],
    [["멍게"], "🪸"],
    [["미역", "김", "다시마", "매생이"], "🌿"],
    [["멸치"], "🐟"],
    [["꼬막"], "🐚"],
    [["전어"], "🐟"],
    [["방어"], "🐟"],
    [["도미"], "🐟"],

    // 축산물
    [["소고기", "쇠고기"], "🥩"],
    [["돼지고기"], "🥩"],
    [["닭고기", "닭"], "🍗"],
    [["오리고기"], "🍗"],
    [["계란", "달걀"], "🥚"]
  ];

  for (const [keywords, emoji] of emojiRules) {
    if (keywords.some(keyword => foodName.includes(keyword))) {
      return emoji;
    }
  }

  // 이름으로 찾지 못했을 때 카테고리별 기본 이모지
  if (category === "수산물") return "🐟";
  if (category === "축산물") return "🥩";
  return "🥗";
}

// 기존 월별 데이터 구조로 변환
const seasonalFoods = {};

for (let month = 1; month <= 12; month++) {
  seasonalFoods[month] = seasonalFoodItems
    .filter(food => food.months.includes(month))
    .map(food => [
      food.name,
      getFoodEmoji(food.name, food.category),
      food.category,
      food.description
    ]);
}


// 현재 월 상품 조회 예시
// const currentMonth = new Date().getMonth() + 1;
// const currentMonthFoods = seasonalFoods.filter(food =>
//   food.months.includes(currentMonth)
// );
