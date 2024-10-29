import { Controller, Get, Post, Body, Put, Param, Delete, Patch, Query } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { EditorialService } from './editorial.service';
import { CreateEditorialDto } from '../dto/editorial.dto';
import { UpdateEditorialDto } from '../dto/editorial.dto';
import { QueryUpdateEditorialDto } from '../dto/query-update.dto';

@Controller('editoriales')
@ApiTags('editoriales')
export class EditorialController {
  constructor(private readonly editorialService: EditorialService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'La editorial ha sido creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  create(@Body() createEditorialDto: CreateEditorialDto) {
    return this.editorialService.create(createEditorialDto);
  }

  @Get()
  findAll() {
    return this.editorialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.editorialService.findOne(id);
  }

  @Put(':id/update')
  @ApiOperation({ summary: 'Actualizar campos específicos de una editorial por ID' })
  async updateFields(
    @Param('id') id: string,
    @Query() updateFields: QueryUpdateEditorialDto
  ) {
    return this.editorialService.updateFields(id, updateFields);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar parcialmente una editorial' })
  @ApiResponse({ status: 200, description: 'Editorial actualizada correctamente' })
  @ApiResponse({ status: 404, description: 'Editorial no encontrada' })
  async patch(
    @Param('id') id: string,
    @Body() updateEditorialDto: UpdateEditorialDto
  ) {
    return this.editorialService.patch(id, updateEditorialDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEditorialDto: CreateEditorialDto) {
    return this.editorialService.update(id, updateEditorialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.editorialService.remove(id);
  }
}