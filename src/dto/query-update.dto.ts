import { IsOptional, IsString, IsNumber, IsArray, Matches } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryUpdateAuthorDto {
  @ApiPropertyOptional({ description: 'Nuevo nombre del autor' })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiPropertyOptional({ description: 'Nuevo apellido del autor' })
  @IsOptional()
  @IsString()
  apellido?: string;

  @ApiPropertyOptional({ description: 'Nuevo DNI del autor' })
  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{8}$/, { message: 'DNI debe tener 8 dígitos' })
  dni?: string;

  @ApiPropertyOptional({ description: 'Nueva nacionalidad del autor' })
  @IsOptional()
  @IsString()
  nacionalidad?: string;
}

export class QueryUpdateEditorialDto {
  @ApiPropertyOptional({ description: 'Nuevo nombre de la editorial' })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiPropertyOptional({ description: 'Nueva dirección de la editorial' })
  @IsOptional()
  @IsString()
  direccion?: string;

  @ApiPropertyOptional({ description: 'Nuevo CUIT de la editorial' })
  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{11}$/, { message: 'CUIT debe tener 11 dígitos' })
  cuit?: string;
}

export class QueryUpdateLibroDto {
  @ApiPropertyOptional({ description: 'Nuevo título del libro' })
  @IsOptional()
  @IsString()
  titulo?: string;

  @ApiPropertyOptional({ description: 'Nueva categoría literaria' })
  @IsOptional()
  @IsString()
  categoriaLiteraria?: string;

  @ApiPropertyOptional({ description: 'Nuevo precio' })
  @IsOptional()
  @IsNumber()
  precio?: number;

  @ApiPropertyOptional({ description: 'Nueva fecha de lanzamiento (DD/MM/YYYY)' })
  @IsOptional()
  @IsString()
  @Matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/)
  fechaLanzamiento?: string;

  @ApiPropertyOptional({ description: 'Nueva descripción' })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiPropertyOptional({ description: 'Nuevos IDs de autores' })
  @IsOptional()
  @IsArray()
  autoresIds?: string[];

  @ApiPropertyOptional({ description: 'Nuevo ID de editorial' })
  @IsOptional()
  @IsString()
  editorialId?: string;
}
