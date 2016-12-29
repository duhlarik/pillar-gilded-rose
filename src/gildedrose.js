var items = [];
const MAX_ITEM_QUALITY = 50;
const MIN_ITEM_QUALITY = 0;

function update_quality() {
  items.forEach((item) => {
    if (item.name === 'Sulfuras, Hand of Ragnaros') { return; }
    if (itemQualityIsValid(item.quality, MAX_ITEM_QUALITY, MIN_ITEM_QUALITY)) {
      switch (item.name) {
        case 'Backstage passes to a TAFKAL80ETC concert':
          item.quality = updateBackstagePassQuality(item.quality, item.sell_in);
          break;
        case 'Aged Brie':
          item.quality = updateItemThatGetsBetterWithAge(item.quality, item.sell_in, 1, 2);
          break;
        default:
          item.quality = updateBasicItemQuality(item.quality, item.sell_in, -1, -2);
      }
      item.sell_in = reduceSellInByOne(item.sell_in);
    }
  });
}

function itemQualityIsValid(quality, MAX_ITEM_QUALITY, MIN_ITEM_QUALITY) {
  if (quality < MAX_ITEM_QUALITY && quality > MIN_ITEM_QUALITY) {
    var itemQualityValidity = true;
    return itemQualityValidity;
  }
}

function reduceSellInByOne(sell_in) {
  sell_in -= 1;
  return sell_in;
}

function updateItemQuality(itemQuality, amount) {
  itemQuality += amount;
  if (itemQuality >= MAX_ITEM_QUALITY) { itemQuality = MAX_ITEM_QUALITY; }
  else if (itemQuality <= MIN_ITEM_QUALITY) { itemQuality = MIN_ITEM_QUALITY; }
  return itemQuality;
}

function updateBasicItemQuality(itemQuality, sell_in, rateBeforeSell_in, rateAfterSell_in) {
  if (sell_in <= 0) {
    itemQuality = updateItemQuality(itemQuality, rateAfterSell_in);
  } else {
    itemQuality = updateItemQuality(itemQuality, rateBeforeSell_in);
  }
  return itemQuality;
}

function updateBackstagePassQuality(backstagePassQuality, sell_in) {
  backstagePassQuality += 1;
  if (sell_in > 5 && sell_in <= 10) {
    backstagePassQuality = updateItemQuality(backstagePassQuality, 1);
  }
  if (sell_in <= 5) {
    backstagePassQuality = updateItemQuality(backstagePassQuality,2);
  }
  if (sell_in <= 0) {
    backstagePassQuality = 0;
  }
  return backstagePassQuality;
}

function updateItemThatGetsBetterWithAge(itemQuality, sell_in, rateBeforeSell_in, rateAfterSell_in) {
  if (sell_in > 0) {
    itemQuality = updateItemQuality (itemQuality, rateBeforeSell_in);
  } else {
    itemQuality = updateItemQuality (itemQuality, rateAfterSell_in);
  }
  return itemQuality;
}

module.exports.items = items;
module.exports.update_quality = update_quality;
