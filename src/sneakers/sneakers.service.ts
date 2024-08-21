import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sneaker, SneakerDocument } from './sneaker.schema';
import { generateFakeSneaker } from './fakerModel';
import { CreateSneakerDto } from './create-sneaker.dto';

@Injectable()
export class SneakersService {
    productModel: any;
    constructor(@InjectModel(Sneaker.name) private sneakerModel: Model<SneakerDocument>) {}
 
    async create(createSneakerDto: CreateSneakerDto): Promise<Sneaker> {
        const newSneaker = new this.sneakerModel(createSneakerDto);
        return newSneaker.save();
    }

    async generateFakeSneaker(sneaker: Sneaker): Promise<Sneaker> {
        const fakeSneaker = generateFakeSneaker();
        const newSneaker = new this.sneakerModel(fakeSneaker);
        return newSneaker.save();
    }

    async findAll(): Promise<Sneaker[]> {
        return this.sneakerModel.find().exec();
    }

    async findById(id: string): Promise<Sneaker> {
        return this.sneakerModel.findById(id).exec();
    }

    async remove(id: string): Promise<Sneaker> {
        return this.sneakerModel.findByIdAndDelete(id).exec();
    }

    async update(id: string, sneaker: Sneaker): Promise<Sneaker> {
        return this.sneakerModel.findByIdAndUpdate(id, sneaker,{new: true}).exec();
    }

    async findByBrand(brand: string): Promise<Sneaker[]> {
        return this.sneakerModel.find({brand}).exec();
    }

    async count(brand: string): Promise<number> {
        const result = await this.sneakerModel.aggregate([
            {$match: {brand}},
            {$count: "count"}
        ]).exec();
        return result[0].count;
    }

    async findBrandSizeStock(): Promise<any[]> {
        return this.sneakerModel.aggregate([
            {
                $group: {
                    _id: {brand: "$brand", size: "$size"}, totalStock: {$sum: "$stock"}
                }
            },
            {
                $project: {brand: "$_id.brand", size: "$_id.size", stock: "$totalStock", _id: 0}
            },
            {
                $sort: {brand: 1, size: 1}
            }
        ]).exec();
    }
}
