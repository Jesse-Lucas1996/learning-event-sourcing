import { walletDB } from '../database/walletDatabase';

function generateEventSignature(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
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
