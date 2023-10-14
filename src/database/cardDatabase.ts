// src/db/database.ts
import Datastore from 'nedb';

const cardsDB = new Datastore({ filename: './src/cards.db', autoload: true });

export { cardsDB };
