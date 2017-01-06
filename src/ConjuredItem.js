"use strict";

const GenericItem = require('../src/GenericItem');

class ConjuredItem extends GenericItem {

  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
    this.rateBeforeSellIn = -2;
    this.rateAfterSellIn = -4;
  }

  updatesConjuredItemQuality() {
    if (this.sellIn <= 0) {
      this.updateItemQuality(this.rateAfterSellIn);
    } else {
      this.updateItemQuality(this.rateBeforeSellIn);
    }
  }
}

module.exports = ConjuredItem;
