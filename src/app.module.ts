import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SneakersModule } from './sneakers/sneakers.module';
import * as dotenv from 'dotenv';
dotenv.config();

const url = process.env.MONGODB_URL;

@Module({
    imports: [
        MongooseModule.forRoot(url),
        SneakersModule,
    ],
})
export class AppModule {}