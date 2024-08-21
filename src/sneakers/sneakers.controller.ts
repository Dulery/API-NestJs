import { Controller, Get, Post, Body, Param, Delete, Put, HttpException, HttpStatus } from '@nestjs/common';
import { SneakersService } from './sneakers.service';
import { CreateSneakerDto } from './create-sneaker.dto';
import { Sneaker } from './sneaker.schema';

@Controller('sneakers')
export class SneakersController {
    //productService: any;
    constructor(private readonly sneakersService: SneakersService) {}

    @Post()
    create(@Body() createSneakerDto: CreateSneakerDto) {
        return this.sneakersService.create(createSneakerDto);
    }
    @Post('/generate')
    createFake(@Body() sneaker: Sneaker) {
        return this.sneakersService.generateFakeSneaker(sneaker);
    }
    @Get()
    findAll() {
        return this.sneakersService.findAll();
    }
    @Get('/bzs')
    findBrandSizeStock() {
        return this.sneakersService.findBrandSizeStock();
    }
    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            const sneaker = await this.sneakersService.findById(id);
        } catch (error) {
            throw new HttpException('ID non valide', HttpStatus.BAD_REQUEST);
        }
    }
    @Delete(':id')
    async remove(@Param('id') id: string) {
        try {
            const del = await this.sneakersService.remove(id);
        } catch (error) {
            throw new HttpException('ID non valide', HttpStatus.BAD_REQUEST);
        }
    }
    @Put(':id')
    async update(@Param('id') id: string, @Body() sneaker: Sneaker) {
        try {
            const modif = await this.sneakersService.update(id, sneaker);
        } catch (error) {
            throw new HttpException('ID non valide', HttpStatus.BAD_REQUEST);
        }
    }
    @Get('/brand/:brand')
    findByBrand(@Param('brand') brand: string) {
        return this.sneakersService.findByBrand(brand);
    }
    @Get('/count/:brand')
    count(@Param('brand') brand: string) {
        return this.sneakersService.count(brand);
    }
}
