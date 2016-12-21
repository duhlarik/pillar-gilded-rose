var items = [];

function update_quality() {
  items.forEach((item) => {
    if (item.name === 'Sulfuras, Hand of Ragnaros') { return; }
    if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
      if (item.quality > 0) {
        item.quality = updateItemQuality(item.quality, -1);
      }
    } else {
      if (item.quality < 50) {
        item.quality = updateItemQuality(item.quality, 1);
        if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
          if (item.sell_in < 11) {
            if (item.quality < 50) {
              item.quality = updateItemQuality(item.quality, 1);
            }
          }
          if (item.sell_in < 6) {
            if (item.quality < 50) {
              item.quality = updateItemQuality(item.quality, 1);
            }
          }
        }
      }
    }
    item.sell_in = item.sell_in - 1;
    if (item.sell_in < 0) {
      if (item.name != 'Aged Brie') {
        if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (item.quality > 0) {
            item.quality = updateItemQuality(item.quality, -1);
          }
        } else {
          item.quality = 0;
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
  if (itemQuality < 50){
  itemQuality = itemQuality + qualityChange;
  return itemQuality;
  }
}

module.exports.items = items;
module.exports.update_quality = update_quality;
