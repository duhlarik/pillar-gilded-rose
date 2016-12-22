var items = [];

function update_quality() {
  items.forEach((item) => {
    if (item.name === 'Sulfuras, Hand of Ragnaros') { return; }
    if (item.quality < 50 && item.quality > 0) {
      switch (item.name) {
        case 'Backstage passes to a TAFKAL80ETC concert':
          item.quality = updateBackstagePassQuality(item.quality, item.sell_in);
          break;
        case 'Aged Brie':
          item.quality = updateAgedBrieQuality(item.quality, item.sell_in);
          break;
        default:
          item.quality = updateItemQuality(item.quality, item.sell_in);
      }
        item.sell_in = reduceSellInByOne(item.sell_in);
      }
    });
}

function reduceSellInByOne (sell_in) {
  sell_in -= 1;
  return sell_in;
}

function updateItemQuality(itemQuality, sell_in) {
  if (sell_in <= 0) {
    itemQuality -= 2;
  } else {
    itemQuality -= 1;
  }
  return itemQuality;
}

function updateBackstagePassQuality(backstagePassQuality, sell_in) {
  if (sell_in > 10) {
    backstagePassQuality += 1;
  }
  if (sell_in <= 5) {
    backstagePassQuality += 3;
  }
  if (sell_in > 5 && sell_in <= 10) {
    backstagePassQuality += 2;
  }
  if (sell_in <= 0) {
    backstagePassQuality = 0;
  }
  if (backstagePassQuality > 50) {
    backstagePassQuality = 50;
  }
  return backstagePassQuality;
}

function updateAgedBrieQuality(agedBrieQuality, sell_in) {
  if (sell_in > 0) {
    agedBrieQuality += 1;
  } else {
    if (agedBrieQuality <= 48) {
      agedBrieQuality += 2;
    } else {
      agedBrieQuality += 1;
    }
  }
  return agedBrieQuality;
}

module.exports.items = items;
module.exports.update_quality = update_quality;
