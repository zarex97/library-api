import { Controller, Get, Post, Body, Put, Param, Delete, Query, Patch } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiQuery, ApiOperation } from '@nestjs/swagger';
import { LibroService } from './libro.service';
import { CreateLibroDto } from '../dto/libro.dto';
import { UpdateLibroDto } from '../dto/libro.dto';
import { QueryUpdateLibroDto } from '../dto/query-update.dto';

@Controller('libros')
@ApiTags('libros')
export class LibroController {
  constructor(private readonly libroService: LibroService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'El libro ha sido creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  @ApiResponse({ status: 404, description: 'Autor o Editorial no encontrado.' })
  create(@Body() createLibroDto: CreateLibroDto) {
    return this.libroService.create(createLibroDto);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'categoriaLiteraria', required: false, type: String })
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('categoriaLiteraria') categoriaLiteraria?: string,
  ) {
    return this.libroService.findAll({ page, limit, categoriaLiteraria });
  }

  @Get(':id')
  @ApiResponse({ status: 500, description: 'El libro no ha pido ser encontrado o el id ingresado es erroneo' })
  findOne(@Param('id') id: string) {
    return this.libroService.findOne(id);
  }

  @Put(':id/update')
  @ApiOperation({ summary: 'Actualizar campos específicos de un libro por ID' })
  async updateFields(
    @Param('id') id: string,
    @Query() updateFields: QueryUpdateLibroDto
  ) {
    return this.libroService.updateFields(id, updateFields);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar parcialmente un libro' })
  @ApiResponse({ status: 200, description: 'Libro actualizado correctamente' })
  @ApiResponse({ status: 404, description: 'Libro no encontrado' })
  async patch(
    @Param('id') id: string,
    @Body() updateLibroDto: UpdateLibroDto
  ) {
    return this.libroService.patch(id, updateLibroDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateLibroDto: CreateLibroDto) {
    return this.libroService.update(id, updateLibroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.libroService.remove(id);
  }
}