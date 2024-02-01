type WalletEvent = {
  type: "CreditWallet" | "DebitWallet";
  correlationId: string;
  transactionId: string;
  eventSignature: string;
  amount: number;
};

export { WalletEvent };
