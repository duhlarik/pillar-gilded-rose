const expect = require('chai').expect;
const Item = require('../src/item');
const items = require('../src/GenericItem').items;
const GenericItem = require('../src/GenericItem');
const BasicItem = require('../src/BasicItem');
const AgedBrie = require('../src/AgedBrie');
const ItemWithUnchangingQuality = require('../src/ItemWithUnchangingQuality');
const BackstagePassItem = require('../src/BackstagePassItem');
const ConjuredItem = require('../src/ConjuredItem');

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
        const item = new BasicItem('Basic Item', 5, 5);
        items.push(item);
        item.reduceSellInByOne();
        item.updateBasicItemQuality();

        expect(item.quality).to.equal(4);
      });

      it('should decrease by one for multiple items at the end of the day', () => {
        const item1 = new BasicItem('Basic Item 1', 5, 5);
        const item2 = new BasicItem('Basic Item 2', 7, 7);
        items.push(item1);
        items.push(item2);

        item1.reduceSellInByOne();
        item2.reduceSellInByOne();
        item1.updateBasicItemQuality();
        item2.updateBasicItemQuality();

        expect(item1.quality).to.equal(4);
        expect(item2.quality).to.equal(6);
      });

      it('should never become negative', () => {
        const item = new BasicItem('Basic Item', 1, -1);
        items.push(item);
        item.reduceSellInByOne();
        item.updateBasicItemQuality();

        expect(item.quality).to.equal(0);
      });

      describe('Expired (sell_in turns negative)', () => {
        it('should never become negative', () => {
          const item = new BasicItem('Basic Item', -1, -1);
          items.push(item);
          item.reduceSellInByOne();
          item.updateBasicItemQuality();

          expect(item.quality).to.equal(0);
        });

        it('should decrease by two', () => {
          const item = new BasicItem('Basic Item', 0, 5);
          items.push(item);
          item.reduceSellInByOne();
          item.updateBasicItemQuality();

          expect(item.quality).to.equal(3);
        });
      });
    });

    describe('Aged Brie', () => {
      it('should increase by one at end of day', () => {
        const item = new AgedBrie('AgedBrie', 5, 5);
        items.push(item);
        item.reduceSellInByOne();
        item.updateBasicItemQuality();

        expect(item.quality).to.equal(6);
      });

      it('should not become greater than 50', () => {
        const item = new AgedBrie('Aged Brie', 1, 50);
        items.push(item);
        item.reduceSellInByOne();
        item.updateBasicItemQuality();

        expect(item.quality).to.equal(50);
      });

      it('should decrease by only 1 if sell in is negative and quality is 49', () => {
        const item = new AgedBrie('Aged Brie', -1, 49);
        items.push(item);
        item.reduceSellInByOne();
        item.updateBasicItemQuality();

        expect(item.quality).to.equal(50);
      });

      describe('Expired (sell_in turns negative)', () => {
        it('should increase by two at end of day', () => {
          const item = new AgedBrie('Aged Brie', 0, 5);
          items.push(item);
          item.reduceSellInByOne();
          item.updateBasicItemQuality();

          expect(item.quality).to.equal(7);
        });

        it('should not become greater than 50', () => {
          const item = new AgedBrie('Aged Brie', -1, 50);
          items.push(item);
          item.reduceSellInByOne();
          item.updateBasicItemQuality();

          expect(item.quality).to.equal(50);
        });
      });
    });

    describe('Sulfuras, Hand of Ragnaros', () => {
      it('should not decrease at end of day', () => {
        const item = new ItemWithUnchangingQuality('Sulfuras, Hand of Ragnaros', 10, 80);
        items.push(item);
        item.reduceSellInByOne();
        item.returnQualityUnchanged();

        expect(item.quality).to.equal(80);
      });

      describe('Expired (sell_in turns negative)', () => {
        it('should not decrease at end of day', () => {
          const item = new ItemWithUnchangingQuality('Sulfuras, Hand of Ragnaros', -1, 80);
          items.push(item);
          item.reduceSellInByOne();
          item.returnQualityUnchanged();

          expect(item.quality).to.equal(80);
        });
      });
    });

    describe('Backstage passes to a TAFKAL80ETC concert', () => {
      it('should increase by one when sell_in is greater than 10', () => {
        const item = new BackstagePassItem('Backstage passes to a TAFKAL80ETC concert', 11, 2);
        items.push(item);
        item.reduceSellInByOne();
        item.updateBackstagePassQuality();
      });

      it('should increase by two when sell_in is less than or equal to 10', () => {
        const item = new BackstagePassItem('Backstage passes to a TAFKAL80ETC concert', 10, 2);
        items.push(item);
        item.reduceSellInByOne();
        item.updateBackstagePassQuality();

        expect(item.quality).to.equal(4);
      });

      it('should increase by one when sell_in is less than or equal to 10 and greater than 5, with a starting quality of 49', () => {
        const item = new BackstagePassItem('Backstage passes to a TAFKAL80ETC concert', 10, 49);
        items.push(item);
        item.reduceSellInByOne();
        item.updateBackstagePassQuality();

        expect(item.quality).to.equal(50);
      });

      it('should increase by two when sell_in is greater than 5', () => {
        const item = new BackstagePassItem('Backstage passes to a TAFKAL80ETC concert', 6, 2);
        items.push(item);
        item.reduceSellInByOne();
        item.updateBackstagePassQuality();

        expect(item.quality).to.equal(4);
      });

      it('should increase by three when sell_in is less than or equal to 5', () => {
        const item = new BackstagePassItem('Backstage passes to a TAFKAL80ETC concert', 5, 2);
        items.push(item);
        item.reduceSellInByOne();
        item.updateBackstagePassQuality();

        expect(item.quality).to.equal(5);
      });

      it('should increase by three when sell_in is less than or equal to 5, with a starting quality of 48', () => {
        const item = new BackstagePassItem('Backstage passes to a TAFKAL80ETC concert', 5, 48);
        items.push(item);
        item.reduceSellInByOne();
        item.updateBackstagePassQuality();

        expect(item.quality).to.equal(50);
      });

      it('should not become greater than 50', () => {
        const item = new BackstagePassItem('Backstage passes to a TAFKAL80ETC concert', 1, 50);
        items.push(item);
        item.reduceSellInByOne();
        item.updateBackstagePassQuality();

        expect(item.quality).to.equal(50);
      });

      describe('Expired (sell_in turns negative)', () => {
        it('should equal zero', () => {
          const item = new BackstagePassItem('Backstage passes to a TAFKAL80ETC concert', 0, 2);
          items.push(item);
          item.reduceSellInByOne();
          item.updateBackstagePassQuality();

          expect(item.quality).to.equal(0);
        });
      });
    });

    describe('Conjured Item', () => {
      it('should decrease by two at the end of the day', () => {
        const item = new ConjuredItem('Connjured Item', 5, 5);
        items.push(item);
        item.reduceSellInByOne();
        item.updatesConjuredItemQuality();

        expect(item.quality).to.equal(3);
      });

      it('should decrease by two for multiple items at the end of the day', () => {
        const item1 = new ConjuredItem('Basic Item 1', 5, 5);
        const item2 = new ConjuredItem('Basic Item 2', 7, 7);
        items.push(item1);
        items.push(item2);

        item1.reduceSellInByOne();
        item2.reduceSellInByOne();
        item1.updatesConjuredItemQuality();
        item2.updatesConjuredItemQuality();

        expect(item1.quality).to.equal(3);
        expect(item2.quality).to.equal(5);
      });

      it('should never become negative', () => {
        const item = new ConjuredItem('Basic Item', 1, -1);
        items.push(item);
        item.reduceSellInByOne();
        item.updatesConjuredItemQuality();

        expect(item.quality).to.equal(0);
      });

      describe('Expired (sell_in turns negative)', () => {
        it('should never become negative', () => {
          const item = new ConjuredItem('Basic Item', -1, -1);
          items.push(item);
          item.reduceSellInByOne();
          item.updatesConjuredItemQuality();

          expect(item.quality).to.equal(0);
        });

        it('should decrease by four', () => {
          const item = new ConjuredItem('Basic Item', 0, 5);
          items.push(item);
          item.reduceSellInByOne();
          item.updatesConjuredItemQuality();

          expect(item.quality).to.equal(1);
        });
      });

    });
  });
});
