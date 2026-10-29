
(function () {
  const DATA_URL = '/today-food/data/product-emojis.json';
  let emojiMap = {};

  window.productEmojiReady = fetch(DATA_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error('이모지 데이터를 불러오지 못했습니다.');
      }
      return response.json();
    })
    .then(data => {
      emojiMap = data;
    })
    .catch(error => {
      console.error(error);
    });

  window.getProductEmoji = function (name, fallback = '🥬') {
    const productName = String(name || '').trim();

    if (emojiMap[productName]) {
      return emojiMap[productName];
    }

    return fallback;
  };
})();

