import { Controller, Get, Post, Body, Put, Param, Delete, Patch , Query} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation  } from '@nestjs/swagger';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from '../dto/author.dto';
import { UpdateAuthorDto } from '../dto/author.dto';
import { QueryUpdateAuthorDto } from '../dto/query-update.dto';

@Controller('autores')
@ApiTags('autores')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'El autor ha sido creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.create(createAuthorDto);
  }

  @Get()
  findAll() {
    return this.authorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorService.findOne(id);
  }

  @Put(':id/update')
  @ApiOperation({ summary: 'Actualizar campos específicos de un autor por ID' })
  @ApiResponse({ status: 200, description: 'Autor actualizado correctamente' })
  @ApiResponse({ status: 404, description: 'Autor no encontrado' })
  async updateFields(
    @Param('id') id: string,
    @Query() updateFields: QueryUpdateAuthorDto
  ) {
    return this.authorService.updateFields(id, updateFields);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar parcialmente un autor' })
  @ApiResponse({ status: 200, description: 'Autor actualizado correctamente' })
  @ApiResponse({ status: 404, description: 'Autor no encontrado' })
  async patch(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto
  ) {
    return this.authorService.patch(id, updateAuthorDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: CreateAuthorDto) {
    return this.authorService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorService.remove(id);
  }
}
