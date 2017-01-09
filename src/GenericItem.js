
"use strict";

const Item = require('../src/item');

var items = [];
const MAX_ITEM_QUALITY = 50;
const MIN_ITEM_QUALITY = 0;

module.exports = class GenericItem extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
    this.rateBeforeSellIn = -1;
    this.rateAfterSellIn = -2;

  }

  reduceSellInByOne() {
    this.sellIn -= 1;
  }

  update() {
    this.reduceSellInByOne();
    if (this.sellIn <= 0) {
      this.quality += this.rateAfterSellIn;
    } else {
      this.quality += this.rateBeforeSellIn;
    }
    this.validateItemQuality();
  }

  validateItemQuality() {
    this.quality = Math.min(this.quality, MAX_ITEM_QUALITY);
    this.quality = Math.max(this.quality, MIN_ITEM_QUALITY);
  }
};

module.exports.items = items;
