const expect = require('chai').expect;
const Item = require('../src/item');
const items = require('../src/gildedrose').items;
const updateQuality = require('../src/gildedrose').update_quality;
const GenericItem = require('../src/GenericItem');
const BasicItem = require('../src/BasicItem');

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

        basicItem.updateItemQuality();

        expect(item.quality).to.equal(4);
      });

      it('should decrease by one for multiple items at the end of the day', () => {
        const item1 = new BasicItem('Basic Item 1', 5, 5);
        const item2 = new BasicItem('Basic Item 2', 7, 7);
        items.push(item1);
        items.push(item2);

        basicItem.updateItemQuality();

        expect(item1.quality).to.equal(4);
        expect(item2.quality).to.equal(6);
      });

      it('should never become negative', () => {
        const item = new BasicItem('Basic Item', 1, 0);
        items.push(item);

        basicItem.updateItemQuality();

        expect(item.quality).to.equal(0);
      });

      describe('Expired (sell_in turns negative)', () => {
        it('should never become negative', () => {
          const item = new BasicItem('Basic Item', -1, 0);
          items.push(item);

          basicItem.updateItemQuality();

          expect(item.quality).to.equal(0);
        });

        it('should decrease by two', () => {
          const item = new BasicItem('Basic Item', 0, 5);
          items.push(item);

          basicItem.updateItemQuality();

          expect(item.quality).to.equal(3);
        });
      });
    });
  });
});
