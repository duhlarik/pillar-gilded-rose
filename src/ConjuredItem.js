"use strict";

const GenericItem = require('../src/GenericItem');

class ConjuredItem extends GenericItem {

  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
    this.rateBeforeSellIn = -2;
    this.rateAfterSellIn = -4;
  }
}

module.exports = ConjuredItem;