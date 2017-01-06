
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

  }

  reduceSellInByOne() {
    this.sellIn -= 1;
  }

  updateItemQuality(amount) {
    this.quality += amount;

    this.validateItemQuality();
  }

  validateItemQuality() {
    this.quality = Math.min(this.quality, MAX_ITEM_QUALITY);
    this.quality = Math.max(this.quality, MIN_ITEM_QUALITY);
  }
};

module.exports.items = items;
