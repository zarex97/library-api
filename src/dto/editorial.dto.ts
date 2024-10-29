import { IsString, IsNotEmpty, IsNumber, IsArray, IsPositive, Matches, Length, IsMongoId, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEditorialDto {
  @ApiProperty({ example: 'Ivrea', description: 'Nombre de la editorial' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  nombre: string;

  @ApiProperty({ example: 'Dr. Prof. Pedro Chutro 2748', description: 'Dirección de la editorial' })
  @IsString()
  @IsNotEmpty()
  @Length(5, 200)
  direccion: string;

  @ApiProperty({ example: '30712334567', description: 'CUIT de la editorial (11 dígitos)' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9]{11}$/, { message: 'CUIT debe tener 11 dígitos numéricos' })
  cuit: string;
}

export class UpdateEditorialDto {
    @ApiPropertyOptional({ example: 'Penguin Random House', description: 'Nombre de la editorial' })
    @IsString()
    @IsOptional()
    @Length(2, 100)
    nombre?: string;
  
    @ApiPropertyOptional({ example: 'Av. Libertador 1234', description: 'Dirección de la editorial' })
    @IsString()
    @IsOptional()
    @Length(5, 200)
    direccion?: string;
  
    @ApiPropertyOptional({ example: '30712334567', description: 'CUIT de la editorial (11 dígitos)' })
    @IsString()
    @IsOptional()
    @Matches(/^[0-9]{11}$/, { message: 'CUIT debe tener 11 dígitos numéricos' })
    cuit?: string;
  }
