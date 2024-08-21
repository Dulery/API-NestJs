import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SneakersService } from './sneakers.service';
import { SneakersController } from './sneakers.controller';
import { Sneaker, SneakerSchema } from './sneaker.schema';

@Module({
    imports: [MongooseModule.forFeature([{name: Sneaker.name, schema: SneakerSchema}])],
    controllers: [SneakersController],
    providers: [SneakersService],
})
export class SneakersModule {}
