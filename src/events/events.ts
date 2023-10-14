interface CreditWalletEvent {
    type: 'CreditWallet';
    amount: number;
  }
  
  interface DebitWalletEvent {
    type: 'DebitWallet';
    amount: number;
  }
  
  type WalletEvent = CreditWalletEvent | DebitWalletEvent;
  
  export { CreditWalletEvent, DebitWalletEvent, WalletEvent };