import { v4 as uuidv4 } from "uuid";
import { eventStore } from "./wallet";

function generateEventSignature(): string {
  return uuidv4();
}

function isEventSignatureDuplicate(eventSignature: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const isDuplicate = eventStore.some(
      (event) => event.eventSignature === eventSignature
    );
    if (isDuplicate) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
}

export { generateEventSignature, isEventSignatureDuplicate };
