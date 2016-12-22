var items = [];

function update_quality() {
  items.forEach((item) => {
    if (item.name === 'Sulfuras, Hand of Ragnaros') { return; }
    if (item.quality < 50) {
      if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
        item.quality = updateBackstagePassQuality(item.quality, item.sell_in);
      } else if (item.name === 'Aged Brie') {
        item.quality = updateAgedBrieQuality(item.quality, item.sell_in);
      } else if (item.quality > 0) {
        item.quality = updateItemQuality(item.quality, item.sell_in);
      }
      item.sell_in = item.sell_in - 1;
    }
  });
}

function updateItemQuality(itemQuality, sell_in) {
  if (sell_in > 0) {
    console.log('this is sell in > 0');
    itemQuality -= 1;
  } else
    if (sell_in <= 0) {
      console.log("this is sell in < 0");
      itemQuality -= 2;
    }
  return itemQuality;
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
