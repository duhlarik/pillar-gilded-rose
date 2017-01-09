"use strict";

const GenericItem = require('../src/GenericItem');

class AgedBrie extends GenericItem {

  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
    this.rateBeforeSellIn = 1;
    this.rateAfterSellIn = 2;
  }
}

module.exports = AgedBrie;
