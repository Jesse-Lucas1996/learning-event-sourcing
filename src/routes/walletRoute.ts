import { Router, Request, Response } from 'express';
import { reduce, getEvents } from '../events/wallet';
import { walletDB } from '../database/walletDatabase';
import { WalletEvent } from '../events/events';
import { v4 as uuidv4 } from 'uuid';
import { generateEventSignature, isEventSignatureDuplicate } from '../events/utils';

const router = Router();


router.post('/credit-wallet', async (req: Request, res: Response) => {
  const { amount }: { amount: number } = req.body;
  const eventSignature = generateEventSignature();
  const isDuplicate = await isEventSignatureDuplicate(eventSignature);
  const events = await getEvents();
  const walletState = reduce(events);

  try {
    const creditEvent: WalletEvent = {
      type: 'CreditWallet',
      correlationId: uuidv4(),
      transactionId: uuidv4(),
      eventSignature: eventSignature,
      amount: amount,
    };

    walletDB.insert(creditEvent, (err, event) => {
      if (err) {
        console.error('Error saving event:', err);
      } else {
        console.log('Event saved:', event);
      }
    });



    if (isDuplicate) {
      return res.status(400).json({ error: 'Duplicate event signature' });
    }

    res.json({ walletState });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/debit-wallet', async (req: Request, res: Response) => {
  const { amount }: { amount: number } = req.body;
  const eventSignature = generateEventSignature();
  const isDuplicate = await isEventSignatureDuplicate(eventSignature);
  try {
    const events: WalletEvent[] = await getEvents(); 
    const walletState = reduce(events);

    if (amount > walletState.balance) {
      return res.status(400).json({ error: 'Insufficient funds for debit' });
    }

    const debitEvent: WalletEvent = {
      type: 'DebitWallet',
      correlationId: uuidv4(),
      transactionId: uuidv4(),
      eventSignature: eventSignature,
      amount: amount,
    };


    walletDB.insert(debitEvent, (err: any, newEvent: WalletEvent) => {
      if (err) {
        console.error('Error saving event:', err);
      } else {
        console.log('Event saved:', newEvent);
      }
    });
    
    if (isDuplicate) {
      return res.status(400).json({ error: 'Duplicate event signature' });
    }

    res.json({ walletState });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


export default router;
