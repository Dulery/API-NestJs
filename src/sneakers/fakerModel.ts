import { faker } from '@faker-js/faker';
import { Sneaker } from './sneaker.schema';
import { Model } from 'mongoose';

export function generateFakeSneaker(): Sneaker {
    return {
        brand: faker.company.buzzNoun(),
        model: faker.commerce.productName(),
        size: faker.number.int({ min: 36, max: 47 }),
        stock: faker.number.int({ min: 0, max: 100 }),
    };
}
