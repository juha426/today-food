(function () {
  const DATA_URL = '/today-food/data/product-emojis.json';
  let emojiMap = {};
  const aliases = { '감귤':'귤', '한라봉':'귤', '천혜향':'귤', '홍로':'사과' };
  window.productEmojiReady = fetch(DATA_URL, { cache: 'no-cache' })
    .then(response => { if (!response.ok) throw new Error('이모지 데이터 HTTP ' + response.status); return response.json(); })
    .then(data => { emojiMap = data || {}; })
    .catch(error => { console.error('[product-emojis]', error); });
  window.getProductEmoji = function (name, fallback = '🥬', category = '') {
    const raw = String(name || '').trim();
    const normalized = raw.replace(/\s*\([^)]*\)\s*$/, '').replace(/\s*\d+(?:\.\d+)?\s*(?:kg|g|그램|킬로그램|개|입|포기|단|망|상자|박스|팩|봉|묶음|마리|손|통|장|매|근|속|포|봉지)\s*$/i, '').trim();
    if (emojiMap[normalized]) return emojiMap[normalized];
    if (emojiMap[raw]) return emojiMap[raw];
    const base = aliases[normalized]; if (base && emojiMap[base]) return emojiMap[base];
    if (/수산|어류|해산/.test(String(category))) return '🐟';
    if (/축산|육류/.test(String(category))) return '🥩';
    return fallback;
  };
})();
