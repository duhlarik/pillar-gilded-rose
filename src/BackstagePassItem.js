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

  update() {
    if (this.sellIn <= 0) {
      this.quality = this.rateAfterSellIn;
    } else if (this.sellIn <= 5) {
      this.quality += this.rateAt5orLessDays;
    } else if (this.sellIn <= 10) {
      this.quality += this.rateAt10orLessDays;
    } else {
      this.quality += this.rateIfGreaterThan10Days;
    }
      this.validateItemQuality();
  }
}



module.exports = BackstagePassItem;
