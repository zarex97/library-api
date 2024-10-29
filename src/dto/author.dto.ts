import { IsString, IsNotEmpty, IsNumber, IsArray, IsPositive, Matches, Length, IsMongoId, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class CreateAuthorDto {
  @ApiProperty({ example: 'Jorge Luis', description: 'Nombre del autor' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  nombre: string;

  @ApiProperty({ example: 'Borges', description: 'Apellido del autor' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  apellido: string;

  @ApiProperty({ example: '12345678', description: 'DNI del autor (8 dígitos)' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9]{8}$/, { message: 'DNI debe tener 8 dígitos numéricos' })
  dni: string;

  @ApiProperty({ example: 'Argentina', description: 'Nacionalidad del autor' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  nacionalidad: string;
}

export class UpdateAuthorDto {
  @ApiPropertyOptional({ example: 'Jorge Luis', description: 'Nombre del autor' })
  @IsString()
  @IsOptional()
  @Length(2, 50)
  nombre?: string;

  @ApiPropertyOptional({ example: 'Borges', description: 'Apellido del autor' })
  @IsString()
  @IsOptional()
  @Length(2, 50)
  apellido?: string;

  @ApiPropertyOptional({ example: '12345678', description: 'DNI del autor (8 dígitos)' })
  @IsString()
  @IsOptional()
  @Matches(/^[0-9]{8}$/, { message: 'DNI debe tener 8 dígitos numéricos' })
  dni?: string;

  @ApiPropertyOptional({ example: 'Argentina', description: 'Nacionalidad del autor' })
  @IsString()
  @IsOptional()
  @Length(2, 50)
  nacionalidad?: string;
}