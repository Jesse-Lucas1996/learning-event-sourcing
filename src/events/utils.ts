import { walletDB } from '../database/walletDatabase';
import { v4 as uuidv4 } from 'uuid';

function generateEventSignature(): string {
  return uuidv4();
}

function isEventSignatureDuplicate(eventSignature: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    walletDB.findOne({ eventSignature }, (err, doc) => {
      if (err) {
        reject(err);
      } else {
        resolve(doc !== null);
      }
    });
  });
}

export { generateEventSignature, isEventSignatureDuplicate };
