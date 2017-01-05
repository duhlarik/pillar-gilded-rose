const Item = require('../src/item');

var items = [];
const MAX_ITEM_QUALITY = 50;
const MIN_ITEM_QUALITY = 0;

module.exports = class GenericItem extends Item {
  // constructor(name, sell_in, itemQuality) {
  //   super(name, sell_in, itemQuality);
    // this.name = name;
    // this.sell_in = sell_in;
    // this.itemQuality = itemQuality;

  // }

  get itemQuality() {
    return this.itemQuality;
  }

  get sell_in() {
    return this.sell_in;
  }

  set itemQuality(value) {

    this.itemQuality = value;
  }

  set sell_in(value) {

    this.sell_in = value;
  }

  reduceSellInByOne(sell_in) {
    sell_in -= 1;
    return sell_in;
  }

  updateItemQuality(itemQuality, amount) {
    itemQuality += amount;

    return this.validateItemQuality(itemQuality);
  }

  validateItemQuality(itemQuality) {

    itemQuality = Math.min(itemQuality, MAX_ITEM_QUALITY);
    itemQuality = Math.max(itemQuality, MIN_ITEM_QUALITY);

    return itemQuality;
  }
};

module.exports.items = items;
