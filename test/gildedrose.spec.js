const expect = require('chai').expect;
const Item = require('../src/item');
const items = require('../src/gildedrose').items;
const updateQuality = require('../src/gildedrose').update_quality;

function removeAllItemsFromArray() {
  while (items.length > 0) {
    items.pop();
  }
}

describe('Gilded Rose Inn', () => {
  beforeEach(removeAllItemsFromArray);
  afterEach(removeAllItemsFromArray);

  describe('Quality', () => {
    describe('Basic Item', () => {
      it('should decrease by one at the end of the day', () => {
        const item = new Item('Basic Item', 5, 5);
        items.push(item);

        updateQuality();

        expect(item.quality).to.equal(4);
      });

      it('should decrease by one for multiple items at the end of the day', () => {
        const item1 = new Item('Basic Item 1', 5, 5);
        const item2 = new Item('Basic Item 2', 7, 7);
        items.push(item1);
        items.push(item2);

        updateQuality();

        expect(item1.quality).to.equal(4);
        expect(item2.quality).to.equal(6);
      });

      it('should never become negative', () => {
        const item = new Item('Basic Item', 1, 0);
        items.push(item);

        updateQuality();

        expect(item.quality).to.equal(0);
      });

      describe('Expired (sell_in turns negative)', () => {
        it('should never become negative', () => {
          const item = new Item('Basic Item', -1, 0);
          items.push(item);

          updateQuality();

          expect(item.quality).to.equal(0);
        });

        it('should decrease by two', () => {
          const item = new Item('Basic Item', 0, 5);
          items.push(item);

          updateQuality();

          expect(item.quality).to.equal(3);
        });
      });
    });

    describe('Aged Brie', () => {
      it('should increase by one at end of day', () => {
        const item = new Item('Aged Brie', 5, 5);
        items.push(item);

        updateQuality();

        expect(item.quality).to.equal(6);
      });

      it('should not become greater than 50', () => {
        const item = new Item('Aged Brie', 1, 50);
        items.push(item);

        updateQuality();

        expect(item.quality).to.equal(50);
      });

      describe('Expired (sell_in turns negative)', () => {
        it('should increase by two at end of day', () => {
          const item = new Item('Aged Brie', 0, 5);
          items.push(item);

          updateQuality();

          expect(item.quality).to.equal(7);
        });

        it('should not become greater than 50', () => {
          const item = new Item('Aged Brie', 1, 50);
          items.push(item);

          updateQuality();

          expect(item.quality).to.equal(50);
        });
      });
    });

    describe('Sulfuras, Hand of Ragnaros', () => {
      it('should not decrease at end of day', () => {
        const item = new Item('Sulfuras, Hand of Ragnaros', 10, 80);
        items.push(item);

        updateQuality();

        expect(item.quality).to.equal(80);
      });

      describe('Expired (sell_in turns negative)', () => {
        it('should not decrease at end of day', () => {
          const item = new Item('Sulfuras, Hand of Ragnaros', -1, 80);
          items.push(item);

          updateQuality();

          expect(item.quality).to.equal(80);
        });
      });
    });

    describe('Backstage passes to a TAFKAL80ETC concert', () => {
      it('should not become greater than 50', () => {
        const item = new Item('Backstage passes to a TAFKAL80ETC concert', 1, 50);
        items.push(item);

        updateQuality();

        expect(item.quality).to.equal(50);
      });

      describe('Expired (sell_in turns negative)', () => {
      });
    });
  });

  describe('Sell In', () => {
    describe('Basic Item', () => {
      it('should decrease by one at the end of the day', () => {
        const item = new Item('Basic Item', 5, 5);
        items.push(item);

        updateQuality();

        expect(item.sell_in).to.equal(4);
      });

      it('should decrease by one for multiple items at the end of the day', () => {
        const item1 = new Item('Basic Item 1', 5, 5);
        const item2 = new Item('Basic Item 2', 7, 7);
        items.push(item1);
        items.push(item2);

        updateQuality();

        expect(item1.sell_in).to.equal(4);
        expect(item2.sell_in).to.equal(6);
      });
    });

    describe('Sulfuras, Hand of Ragnaros', () => {
      it('should not decrease', () => {
        const item = new Item('Sulfuras, Hand of Ragnaros', 42, 80);
        items.push(item);

        updateQuality();

        expect(item.sell_in).to.equal(42);
      });
    });
  });
});
