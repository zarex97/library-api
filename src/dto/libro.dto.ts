import { IsString, IsNotEmpty, IsNumber, IsArray, IsPositive, Matches, Length, IsMongoId, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateLibroDto {
  @ApiProperty({ 
    example: ['507f1f77bcf86cd799439011'], 
    description: 'Array de IDs de autores',
    type: [String]
  })
  @IsArray()
  @IsMongoId({ each: true })
  @IsNotEmpty()
  autoresIds: string[];

  @ApiProperty({ 
    example: '507f1f77bcf86cd799439011', 
    description: 'ID de la editorial' 
  })
  @IsMongoId()
  @IsNotEmpty()
  editorialId: string;

  @ApiProperty({ 
    example: 'Cien años de soledad', 
    description: 'Título del libro' 
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 200)
  titulo: string;

  @ApiProperty({ 
    example: 'Realismo Mágico', 
    description: 'Categoría literaria del libro' 
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  categoriaLiteraria: string;

  @ApiProperty({ 
    example: 29.99, 
    description: 'Precio del libro' 
  })
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  precio: number;

  @ApiProperty({ 
    example: '01/01/2023', 
    description: 'Fecha de lanzamiento (DD/MM/YYYY o DD/MM/YY)' 
  })
  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$|^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/\d\d$/,
    { message: 'Fecha debe estar en formato DD/MM/YYYY o DD/MM/YY' }
  )
  fechaLanzamiento: string;

  @ApiProperty({ 
    example: 'Una historia épica sobre una familia...', 
    description: 'Descripción del libro' 
  })
  @IsString()
  @IsNotEmpty()
  @Length(10, 1000)
  descripcion: string;
}

export class UpdateLibroDto {
  @ApiPropertyOptional({ example: ['id1', 'id2'], description: 'IDs de los autores' })
  @IsArray()
  @IsOptional()
  autoresIds?: string[];

  @ApiPropertyOptional({ example: 'id1', description: 'ID de la editorial' })
  @IsString()
  @IsOptional()
  editorialId?: string;

  @ApiPropertyOptional({ example: 'Cien años de soledad', description: 'Título del libro' })
  @IsString()
  @IsOptional()
  @Length(1, 200)
  titulo?: string;

  @ApiPropertyOptional({ example: 'Ficción', description: 'Categoría literaria del libro' })
  @IsString()
  @IsOptional()
  categoriaLiteraria?: string;

  @ApiPropertyOptional({ example: 29.99, description: 'Precio del libro' })
  @IsNumber()
  @IsOptional()
  precio?: number;

  @ApiPropertyOptional({ example: '01/01/2023', description: 'Fecha de lanzamiento' })
  @IsString()
  @IsOptional()
  @Matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/)
  fechaLanzamiento?: string;

  @ApiPropertyOptional({ example: 'Descripción del libro', description: 'Descripción del libro' })
  @IsString()
  @IsOptional()
  @Length(10, 1000)
  descripcion?: string;
}