var items = [];
const MAX_ITEM_QUALITY = 50;
const MIN_ITEM_QUALITY = 0;

function update_quality() {
  items.forEach((item) => {
    if (item.name === 'Sulfuras, Hand of Ragnaros') { return; }
    if (item.quality < MAX_ITEM_QUALITY && item.quality > MIN_ITEM_QUALITY) {
      switch (item.name) {
        case 'Backstage passes to a TAFKAL80ETC concert':
          updateBackstagePassQuality(item);
          break;
        case 'Aged Brie':
          updateItemThatGetsBetterWithAge(item, 1, 2);
          break; 
        default:
          updateBasicItemQuality(item, 1, 2);
      }
      reduceSellInByOne(item);
    }
    if (item.quality > MAX_ITEM_QUALITY) {
      item.quality = MAX_ITEM_QUALITY;
    }
  });
}

function reduceSellInByOne(item) {
  item.sell_in -= 1;
  return item.sell_in;
}

function updateBasicItemQuality(item, rateBeforeSell_in, rateAfterSell_in) {
  if (item.sell_in <= 0) {
    item.quality -= rateAfterSell_in;
  } else {
    item.quality -= rateBeforeSell_in;
  }
  return item.quality;
}

function updateBackstagePassQuality(item) {
  item.quality += 1;
  if (item.sell_in <= 5) {
    item.quality += 2;
  }
  if (item.sell_in > 5 && item.sell_in <= 10) {
    item.quality += 1;
  }
  if (item.sell_in <= 0) {
    item.quality = 0;
  }
  return item.quality;
}

function updateItemThatGetsBetterWithAge(item, rateBeforeSell_in, rateAfterSell_in) {
  if (item.sell_in > 0) {
    item.quality += rateBeforeSell_in;
  } else {
    item.quality += rateAfterSell_in;
  }
  return item.quality;
}

module.exports.items = items;
module.exports.update_quality = update_quality;
