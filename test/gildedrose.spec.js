const expect = require('chai').expect;
const Item = require('../src/gildedrose').Item;
const items = require('../src/gildedrose').items;
const updateQuality = require('../src/gildedrose').update_quality;

describe('Gilded Rose Inn', () => {
  it('Basic item should decrease in quality at end of day', () => {
    let item = new Item('random', 5, 5);
    items.push(item);
    updateQuality();
    expect(item.quality).to.equal(4);
  });
  it('Basic item should decrease in sell_in at end of day', () => {
    let item = new Item('random', 5, 5);
    items.push(item);
    updateQuality();
    expect(item.sell_in).to.equal(4);
  });
  it('Two basic items should both decrease in quality at end of day', () => {
    let item1 = new Item('random1', 5, 5);
    let item2 = new Item('random2', 7, 7);
    items.push(item1);
    items.push(item2);
    updateQuality();
    expect(item1.quality).to.equal(4);
    expect(item2.quality).to.equal(6);
  });
  it('Two basic items should both decrease in sell_in at end of day', () => {
    let item1 = new Item('random1', 5, 5);
    let item2 = new Item('random2', 7, 7);
    items.push(item1);
    items.push(item2);
    updateQuality();
    expect(item1.sell_in).to.equal(4);
    expect(item2.sell_in).to.equal(6);
  });
  it('An item with negative sell_in decreases in quality by 2 at end of day', () => {
    let item = new Item('random', -1, 5);
    items.push(item);
    updateQuality();
    expect(item.quality).to.equal(3);
  });
  it('An item with 0 sell_in decreases in quality by 2 at end of day', () => {
    let item = new Item('random', 0, 5);
    items.push(item);
    updateQuality();
    expect(item.quality).to.equal(3);
  });
  it('An item with 1 sell_in decreases in quality by 1 at end of day', () => {
    let item = new Item('random', 1, 5);
    items.push(item);
    updateQuality();
    expect(item.quality).to.equal(4);
  });
  it('An non-expired item with 1 quality should have 0 quality at end of day', () => {
    let item = new Item('random', 1, 1);
    items.push(item);
    updateQuality();
    expect(item.quality).to.equal(0);
  });
  it('An non-expired item with 0 quality should have 0 quality at end of day', () => {
    let item = new Item('random', 1, 0);
    items.push(item);
    updateQuality();
    expect(item.quality).to.equal(0);
  });
  it('An expired item with 1 quality should have 0 quality at end of day', () => {
    let item = new Item('random', -1, 1);
    items.push(item);
    updateQuality();
    expect(item.quality).to.equal(0);
  });
  it('An expired item with 0 quality should have 0 quality at end of day', () => {
    let item = new Item('random', -1, 0);
    items.push(item);
    updateQuality();
    expect(item.quality).to.equal(0);
  });
  it('An expired item with 2 quality should have 0 quality at end of day', () => {
    let item = new Item('random', -1, 2);
    items.push(item);
    updateQuality();
    expect(item.quality).to.equal(0);
  });
  it('Aged Brie should increase in quality by one at end of day', () => {
    let item = new Item('Aged Brie', 5, 5);
    items.push(item);
    updateQuality();
    expect(item.quality).to.equal(6);
  });
  it('Aged Brie should continue to increase in quality by two after it has expired', () => {
    let item = new Item('Aged Brie', -1, 5);
    items.push(item);
    updateQuality();
    expect(item.quality).to.equal(7);
  });

  function shouldNotGoBeyond50(itemName) {
    it(itemName + ' should not increase in quality beyond 50', () => {
      let item = new Item(itemName, 1, 50);
      items.push(item);
      updateQuality();
      expect(item.quality).to.equal(50);
    });
  }

  shouldNotGoBeyond50('Aged Brie');
  shouldNotGoBeyond50('Backstage passes to a TAFKAL80ETC concert');

  describe('Sulfuras, Hand of Ragnaros, is a legendary item:', () => {
    it('Sulfuras shall always have a quality of 80', () => {
      let item = new Item('Sulfuras, Hand of Ragnaros', 10, 80);
      items.push(item);
      updateQuality();
      expect(item.quality).to.equal(80);
    });
    it('Sulfuras shall always have a quality of 80 even if past sell by date', () => {
      let item = new Item('Sulfuras, Hand of Ragnaros', -1, 80);
      items.push(item);
      updateQuality();
      expect(item.quality).to.equal(80);
    });
    it('sell_in should not change', () => {
      let item = new Item('Sulfuras, Hand of Ragnaros', 42, 80);
      items.push(item);
      updateQuality();
      expect(item.sell_in).to.equal(42);
    });
  });

});
