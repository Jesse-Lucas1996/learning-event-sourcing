import Datastore from 'nedb';

const walletDB = new Datastore({ filename: 'events.db', autoload: true });

export { walletDB };
