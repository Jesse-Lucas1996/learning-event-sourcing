// src/routes/cardRoutes.ts
import { Router, Request, Response } from 'express';
import CardHandler from '../handlers/cardHandler';
import { cardsDB } from '../database/cardDatabase';
import { Card } from '../types/Card';

const router = Router();

router.post('/add-to-cart', (req: Request, res: Response) => {
  const { cardId, userId } = req.body;
  if(!cardId || !userId) {
    res.status(400).send('Missing required data');
    return;
  }
  CardHandler.addToCart(cardId, userId);

  res.send('Card added to cart');
});

router.post('/purchase', (req: Request, res: Response) => {
  const { cardId, userId, totalPrice } = req.body;
  if(!cardId || !userId || !totalPrice) {
    res.status(400).send('Missing required data');
    return;
  }
  CardHandler.purchaseCard(cardId, userId, totalPrice);

  res.send('Card purchased');
});



router.get('/cards-in-cart/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;

  console.log('Fetching cards in cart for user:', userId)

  cardsDB.find({ userId, status: 'inCart' }, (err: Error, docs: Card[]) => {
    if (err) {
      console.error('Error fetching cards in cart:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(docs);
    }
  });
});

router.get('/cards-purchased/:userId', (req: Request, res: Response) => {
    const { userId } = req.params;
  
    console.log('Fetching purchased cards for user:', userId)
  
    cardsDB.find({ userId, status: 'purchased' }, (err: Error, docs: Card[]) => {
      if (err) {
        console.error('Error fetching purchased cards:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(docs);
      }
    });
  });

export default router;
