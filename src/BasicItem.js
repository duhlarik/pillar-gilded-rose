const GenericItem = require('../src/GenericItem');

class BasicItem extends GenericItem {

  constructor(name, sell_in, itemQuality) {
    super(name, sell_in, itemQuality);
    this.rateBeforeSell_in = -1;
    this.rateAfterSell_in = -2;
  }

  get rateBeforeSell_in() {
    return this.rateBeforeSell_in;
  }

  get rateAfterSell_in() {
    return this.rateAfterSell_in;
  }

  set rateBeforeSell_in(value) {

    this.rateBeforeSell_in = value;
  }

  set rateAfterSell_in(value) {

    this.rateAfterSell_in = value;
  }
  updateItemQuality() {
    if (sell_in <= 0) {
      itemQuality = super.updateItemQuality(itemQuality, rateAfterSell_in);
    } else {
      itemQuality = super.updateItemQuality(itemQuality, rateBeforeSell_in);
    }

    return itemQuality;
  }
}

module.exports = BasicItem;
