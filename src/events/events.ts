interface CreditWalletEvent {
    type: 'CreditWallet';
    correlationId: string;
    amount: number;
  }
  
  interface DebitWalletEvent {
    type: 'DebitWallet';
    correlationId: string;
    amount: number;
  }
  
  type WalletEvent = CreditWalletEvent | DebitWalletEvent;
  
  export { CreditWalletEvent, DebitWalletEvent, WalletEvent };