import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SneakerDocument = Sneaker & Document;

@Schema({collection: 'Sneakers'})
export class Sneaker {
    @Prop({required: true})
    brand: string;
    @Prop({required: true})
    model: string;
    @Prop({required: true})
    size: number;
    @Prop({required: true})
    stock: number;
}

export const SneakerSchema = SchemaFactory.createForClass(Sneaker);
