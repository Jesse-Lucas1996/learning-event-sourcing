interface CreditWalletEvent {
    type: 'CreditWallet';
    correlationId: string;
    transactionId: string;
    eventSignature: string;
    amount: number;
  }
  
  interface DebitWalletEvent {
    type: 'DebitWallet';
    correlationId: string;
    transactionId: string;
    eventSignature: string;
    amount: number;
  }
  
  type WalletEvent = CreditWalletEvent | DebitWalletEvent;
  
  export { CreditWalletEvent, DebitWalletEvent, WalletEvent };