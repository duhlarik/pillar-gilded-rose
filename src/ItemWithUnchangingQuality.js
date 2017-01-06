"use strict";

const GenericItem = require('../src/GenericItem');

class ItemWithUnchangingQuality extends GenericItem {

  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }

  returnQualityUnchanged() {
      this.quality += 0;
    }
  }

module.exports = ItemWithUnchangingQuality;