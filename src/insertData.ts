import { MongoClient } from 'mongodb';
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';

dotenv.config();

const url = process.env.MONGODB_URL;
const dbName = 'mongoDB';
const collectionName = 'Sneakers';
const fakeData = Array.from({length: 100000}, () => ({
    brand: faker.company.buzzNoun(),
    model: faker.commerce.productName(),
    size: faker.number.int({min: 36, max: 47}),
    stock: faker.number.int({min: 0, max: 100}),
}));

async function insertData() {
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const insertData = await collection.insertMany(fakeData);
        console.log('Documents dans studio3t ', insertData);
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}
insertData();