import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Libro, LibroDocument } from '../schemas/libro.schema';
import { CreateLibroDto } from '../dto/libro.dto';
import { UpdateLibroDto } from '../dto/libro.dto';
import { AuthorService } from '../author/author.service';
import { EditorialService } from '../editorial/editorial.service';
import { QueryUpdateLibroDto } from '../dto/query-update.dto';
import * as moment from 'moment';

@Injectable()
export class LibroService {
  constructor(
    @InjectModel(Libro.name) private libroModel: Model<LibroDocument>,
    private authorService: AuthorService,
    private editorialService: EditorialService,
  ) {}

  async create(createLibroDto: CreateLibroDto): Promise<Libro> {
    // esto para asegurarse que existan los autores
    await Promise.all(
      createLibroDto.autoresIds.map(id => this.authorService.findOne(id))
    );

    // y esto para asegurar de que exista la editorial
    await this.editorialService.findOne(createLibroDto.editorialId);

    // ajustar fecha, IMPORTANTE
    const fechaNormalizada = moment(
      createLibroDto.fechaLanzamiento,
      ['DD/MM/YYYY', 'DD/MM/YY']
    ).format('YYYY-MM-DD');

    const libro = new this.libroModel({
      ...createLibroDto,
      autores: createLibroDto.autoresIds,
      editorial: createLibroDto.editorialId,
      fechaLanzamiento: fechaNormalizada,
    });

    return libro.save();
  }

  async findAll(query: {
    page?: number;
    limit?: number;
    categoriaLiteraria?: string;
  }): Promise<{
    items: Libro[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const { page = 1, limit = 10, categoriaLiteraria } = query;
    
    const filter = categoriaLiteraria ? { categoriaLiteraria } : {};
    
    const [items, total] = await Promise.all([
      this.libroModel
        .find(filter)
        .populate('autores')
        .populate('editorial')
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.libroModel.countDocuments(filter),
    ]);

    return {
      items,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Libro> {
    const libro = await this.libroModel
      .findById(id)
      .populate('autores')
      .populate('editorial')
      .exec();
      
    if (!libro) {
      throw new NotFoundException('Libro no encontrado');
    }
    
    return libro;
  }

  async update(id: string, updateLibroDto: CreateLibroDto): Promise<Libro> {
    // esto para asegurarse que existan los autores
    await Promise.all(
      updateLibroDto.autoresIds.map(id => this.authorService.findOne(id))
    );

    // y esto para asegurar de que exista la editorial
    await this.editorialService.findOne(updateLibroDto.editorialId);

    // ajustar fecha, IMPORTANTE
    const fechaNormalizada = moment(
      updateLibroDto.fechaLanzamiento,
      ['DD/MM/YYYY', 'DD/MM/YY']
    ).format('YYYY-MM-DD');

    const updatedLibro = await this.libroModel
      .findByIdAndUpdate(
        id, 
        {
          ...updateLibroDto,
          autores: updateLibroDto.autoresIds,
          editorial: updateLibroDto.editorialId,
          fechaLanzamiento: fechaNormalizada,
        },
        { new: true }
      )
      .populate('autores')
      .populate('editorial')
      .exec();

    if (!updatedLibro) {
      throw new NotFoundException('Libro no encontrado');
    }

    return updatedLibro;
  }
  
  async updateFields(id: string, updateFields: QueryUpdateLibroDto): Promise<Libro> {
    // validar autores si se están actualizando
    if (updateFields.autoresIds) {
      await Promise.all(
        updateFields.autoresIds.map(authorId => this.authorService.findOne(authorId))
      );
    }

    // validar editorial si se está actualizando
    if (updateFields.editorialId) {
      await this.editorialService.findOne(updateFields.editorialId);
    }

    // normalizar fecha si se está actualizando (ISO 8601)
    if (updateFields.fechaLanzamiento) {
      updateFields.fechaLanzamiento = moment(
        updateFields.fechaLanzamiento,
        'DD/MM/YYYY'
      ).format('YYYY-MM-DD');
    }

    const updatedLibro = await this.libroModel
      .findByIdAndUpdate(id, { $set: updateFields }, { new: true })
      .populate(['autores', 'editorial'])
      .exec();

    if (!updatedLibro) {
      throw new NotFoundException('Libro no encontrado');
    }

    return updatedLibro;
  }

  async patch(id: string, updateLibroDto: UpdateLibroDto): Promise<Libro> {
    // Validar autores si se están actualizando
    if (updateLibroDto.autoresIds) {
      await Promise.all(
        updateLibroDto.autoresIds.map(authorId => this.authorService.findOne(authorId))
      );
    }

    // Validar editorial si se está actualizando
    if (updateLibroDto.editorialId) {
      await this.editorialService.findOne(updateLibroDto.editorialId);
    }

    // Normalizar fecha si se está actualizando
    if (updateLibroDto.fechaLanzamiento) {
      updateLibroDto.fechaLanzamiento = moment(
        updateLibroDto.fechaLanzamiento,
        'DD/MM/YYYY'
      ).format('YYYY-MM-DD');
    }

    const libro = await this.libroModel
      .findByIdAndUpdate(id, { $set: updateLibroDto }, { new: true })
      .populate(['autores', 'editorial'])
      .exec();

    if (!libro) {
      throw new NotFoundException('Libro no encontrado');
    }

    return libro;
  }

  async remove(id: string): Promise<void> {
    const result = await this.libroModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Libro no encontrado');
    }
  }
}