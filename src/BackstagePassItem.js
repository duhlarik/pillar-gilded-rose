"use strict";

const GenericItem = require('../src/GenericItem');

class BackstagePassItem extends GenericItem {

  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
    this.rateAfterSellIn = 0;
    this.rateAt5orLessDays = 3;
    this.rateAt10orLessDays = 2;
    this.rateIfGreaterThan10Days = 1;

  }

  updateBackstagePassQuality() {
    if (this.sellIn < 0) {
      this.validateItemQuality();
      this.quality = 0;
    } else if (this.sellIn < 5) {
      this.updateItemQuality(this.rateAt5orLessDays)
    } else if (this.sellIn <= 10) {
      this.updateItemQuality(this.rateAt10orLessDays)
    } else {
      this.updateItemQuality(this.rateIfGreaterThan10Days)
    }
  }
}



module.exports = BackstagePassItem;
