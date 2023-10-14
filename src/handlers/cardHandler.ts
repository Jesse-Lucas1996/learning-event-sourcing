// src/handlers/CardHandler.ts
import EventStore from '../events/eventStore';
import { cardsDB } from '../database/cardDatabase';
import CardAddedToCart from '../events/cardAddedToCart';
import CardPurchased from '../events/cardPurchased';

class CardHandler {
  static addToCart(cardId: string, userId: string) {
    if(!cardId || !userId) {
        throw new Error('Missing required data');
    }
    const event: CardAddedToCart = { cardId, userId, status: 'inCart' };
    EventStore.getInstance().publish('CardAddedToCart', event);


    cardsDB.insert({ cardId, userId, status: 'inCart' }, (err, newDoc) => {
      if (err) {
        console.error('Error adding card to cart:', err);
      } else {
        console.log('Card added to cart:', newDoc);
      }
    });
  }

  static purchaseCard(cardId: string, userId: string, totalPrice: number) {
    if (!cardId || !userId || !totalPrice) {
      throw new Error('Missing required data');
    }

    cardsDB.findOne({ cardId, userId, status: 'inCart' }, (err, doc) => {
      if (err) {
        throw new Error('Internal Server Error');
      }

      if (!doc) {
        throw new Error('Card not found in user\'s cart');
      }

      const purchaseEvent: CardPurchased = { cardId, userId, totalPrice, status: 'purchased' };
      EventStore.getInstance().publish('CardPurchased', purchaseEvent);

      cardsDB.insert({ cardId, userId, totalPrice, status: 'purchased' }, (err, newDoc) => {
        if (err) {
          console.error('Error purchasing card:', err);
        } else {
          console.log('Card purchased:', newDoc);
        }
      });

      cardsDB.remove({ cardId, userId, status: 'inCart' }, {}, (err, numRemoved) => {
        if (err) {
          console.error('Error removing card from cart:', err);
        } else {
          console.log(`Removed ${numRemoved} card from cart`);
        }
      });
    });
  }
  
}

export default CardHandler;
