import { Router, Request, Response } from 'express';
import { reduce, getEvents } from '../events/wallet';
import { walletDB } from '../database/walletDatabase';
import { WalletEvent } from '../events/events';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

router.post('/credit-wallet', (req: Request, res: Response) => {
  const { amount } = req.body;

  const creditEvent: WalletEvent = {
    type: 'CreditWallet',
    correlationId: uuidv4(),
    amount: amount,
  };

  walletDB.insert(creditEvent, (err, newEvent) => {
    if (err) {
      console.error('Error saving event:', err);
    } else {
      console.log('Event saved:', newEvent);
    }
  });

  getEvents((events: WalletEvent[]) => {
    const walletState = reduce(events);
    res.json(walletState);
  });
});

router.post('/debit-wallet', (req: Request, res: Response) => {
  const { amount } = req.body;

  const debitEvent: WalletEvent = {
    type: 'DebitWallet',
    correlationId: uuidv4(),
    amount: amount,
  };

  walletDB.insert(debitEvent, (err: any, newEvent: WalletEvent) => {
    if (err) {
      console.error('Error saving event:', err);
    } else {
      console.log('Event saved:', newEvent);
    }
  });

  getEvents((events: WalletEvent[]) => {
    const walletState = reduce(events);
    res.json({walletState});
  });
});

export default router;
