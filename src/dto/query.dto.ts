import { IsOptional, IsNumber, IsString, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationQueryDto {
  @ApiPropertyOptional({ 
    description: 'Número de página', 
    minimum: 1, 
    default: 1 
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ 
    description: 'Cantidad de elementos por página', 
    minimum: 1, 
    maximum: 50, 
    default: 10 
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(50)
  limit?: number = 10;
}

export class LibroQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ 
    description: 'Filtrar por categoría literaria' 
  })
  @IsOptional()
  @IsString()
  categoriaLiteraria?: string;
}