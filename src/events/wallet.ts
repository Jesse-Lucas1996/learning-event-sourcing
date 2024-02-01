import { WalletEvent } from "./events";

interface WalletAggregate {
  balance: number;
  version: number;
}

const eventStore: WalletEvent[] = [];

function reduce(events: WalletEvent[]): WalletAggregate {
  return events.reduce(
    (aggregate, event) => {
      switch (event.type) {
        case "CreditWallet":
          aggregate.balance += event.amount;
          break;

        case "DebitWallet":
          aggregate.balance -= event.amount;
          break;
      }

      aggregate.version++;

      return aggregate;
    },
    { balance: 0, version: 0 }
  );
}

function getEvents(): Promise<WalletEvent[]> {
  return Promise.resolve(eventStore);
}

export { eventStore, reduce, getEvents };
