"use strict";
const GenericItem = require('../src/GenericItem');

class BasicItem extends GenericItem {

  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
    this.rateBeforeSellIn = -1;
    this.rateAfterSellIn = -2;
  }

  updateBasicItemQuality() {
    if (this.sellIn <= 0) {
      this.updateItemQuality(this.rateAfterSellIn);
    } else {
      this.updateItemQuality(this.rateBeforeSellIn);
    }
  }
}

module.exports = BasicItem;
