var items = [];
const MAX_ITEM_QUALITY = 50;
const MIN_ITEM_QUALITY = 0;

function update_quality() {
  items.forEach((item) => {
    if (item.name === 'Sulfuras, Hand of Ragnaros') { return; }
    if (item.quality < MAX_ITEM_QUALITY && item.quality > MIN_ITEM_QUALITY) {
      switch (item.name) {
        case 'Backstage passes to a TAFKAL80ETC concert':
          updateBackstagePassQuality(item, item.sell_in);
          break;
        case 'Aged Brie':
          updateItemThatGetsBetterWithAge(item, item.sell_in, 1, 2);
          break; 
        default:
          updateBasicItemQuality(item, item.sell_in, 1, 2);
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

function updateBasicItemQuality(item, sell_in, rateBeforeSell_in, rateAfterSell_in) {
  if (sell_in <= 0) {
    item.quality -= rateAfterSell_in;
  } else {
    item.quality -= rateBeforeSell_in;
  }
  return item.quality;
}

function updateBackstagePassQuality(item, sell_in) {
  item.quality += 1;
  if (sell_in <= 5) {
    item.quality += 2;
  }
  if (sell_in > 5 && sell_in <= 10) {
    item.quality += 1;
  }
  if (sell_in <= 0) {
    item.quality = 0;
  }
  return item.quality;
}

function updateItemThatGetsBetterWithAge(item, sell_in, rateBeforeSell_in, rateAfterSell_in) {
  if (sell_in > 0) {
    item.quality += rateBeforeSell_in;
  } else {
    item.quality += rateAfterSell_in;
  }
  return item.quality;
}

module.exports.items = items;
module.exports.update_quality = update_quality;
