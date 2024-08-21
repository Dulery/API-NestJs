import { IsNotEmpty, IsString, IsNumber, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSneakerDto {
    @ApiProperty({description: 'Marque de la sneaker'})
    @IsNotEmpty({message: 'Il manque la marque'})
    @IsString()
    brand: string;

    @ApiProperty({description: 'Modèle de la sneaker'})
    @IsNotEmpty({message: 'Il manque le modèle'})
    @IsString()
    model: string;

    @ApiProperty({description: 'Taille de la sneaker'})
    @IsNotEmpty({message: 'Il manque la taille'})
    @IsNumber()
    size: number;

    @ApiProperty({description: 'Stock de la sneaker'})
    @IsNotEmpty({message: 'Il manque le stock'})
    @IsNumber()
    stock: number;
}
