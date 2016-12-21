var items = [];

function update_quality() {
  items.forEach((item) => {
    if (item.name === 'Sulfuras, Hand of Ragnaros') { return; }
    else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
      item.quality = updateBackstagePassQuality(item.quality, item.sell_in);
    } else if (item.name === 'Aged Brie') {
      if (item.quality < 50) {
        item.quality = updateItemQuality(item.quality, 1);
      }
    }
    else if (item.quality > 0) {
      item.quality = updateItemQuality(item.quality, -1);
    }
    item.sell_in = item.sell_in - 1;
    if (item.sell_in < 0) {
      if (item.name != 'Aged Brie') {
        if (item.quality > 0) {
          item.quality = updateItemQuality(item.quality, -1);
        }
      } else {
        if (item.quality < 50) {
          item.quality = updateItemQuality(item.quality, 1);
        }
      }
    }
  });
}

function updateItemQuality(itemQuality, qualityChange) {
  if (itemQuality < 50) {
    itemQuality = itemQuality + qualityChange;
    return itemQuality;
  }
}

function updateBackstagePassQuality(backstagePassQuality, sell_in) {
  if (backstagePassQuality < 48) {
    if (sell_in <= 5) {
      backstagePassQuality += 3;
    }
    if (sell_in <= 10 && sell_in > 5) {
      backstagePassQuality = backstagePassQuality + 2;
    }
    if (sell_in > 10) {
      backstagePassQuality = backstagePassQuality + 1;
    }
  }
  if (backstagePassQuality === 48) {
    if (sell_in <= 10) {
      backstagePassQuality = backstagePassQuality + 2;
    }
    if (sell_in > 10) {
      backstagePassQuality = backstagePassQuality + 1;
    }
  }
  if (backstagePassQuality === 49) {
    backstagePassQuality = backstagePassQuality + 1;
  }
  if (sell_in <= 0) {
    backstagePassQuality = 0;
  }
  return backstagePassQuality;
}

module.exports.items = items;
module.exports.update_quality = update_quality;
