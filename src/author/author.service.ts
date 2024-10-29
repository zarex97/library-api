import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author, AuthorDocument } from '../schemas/author.schema';
import { CreateAuthorDto } from '../dto/author.dto';
import { UpdateAuthorDto } from '../dto/author.dto';
import { QueryUpdateAuthorDto } from '../dto/query-update.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const createdAuthor = new this.authorModel(createAuthorDto);
    return createdAuthor.save();
  }

  async findAll(): Promise<Author[]> {
    return this.authorModel.find().exec();
  }

  async findOne(id: string): Promise<Author> {
    const author = await this.authorModel.findById(id).exec();
    if (!author) {
      throw new NotFoundException('Autor no encontrado');
    }
    return author;
  }

  async update(id: string, updateAuthorDto: CreateAuthorDto): Promise<Author> {
    const updatedAuthor = await this.authorModel
      .findByIdAndUpdate(id, updateAuthorDto, { new: true })
      .exec();
    if (!updatedAuthor) {
      throw new NotFoundException('Autor no encontrado');
    }
    return updatedAuthor;
  }

  async updateFields(id: string, updateFields: QueryUpdateAuthorDto): Promise<Author> {
    if (updateFields.dni) {
      const existingAuthor = await this.authorModel.findOne({
        dni: updateFields.dni,
        _id: { $ne: id }
      });
      if (existingAuthor) {
        throw new BadRequestException('Ya existe un autor con ese DNI');
      }
    }

    const updatedAuthor = await this.authorModel
      .findByIdAndUpdate(id, { $set: updateFields }, { new: true })
      .exec();

    if (!updatedAuthor) {
      throw new NotFoundException('Autor no encontrado');
    }

    return updatedAuthor;
  }

  async remove(id: string): Promise<void> {
    const result = await this.authorModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Autor no encontrado');
    }
  }

  async patch(id: string, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    // Si se está actualizando el DNI, verificar que no exista
    if (updateAuthorDto.dni) {
      const existingAuthor = await this.authorModel.findOne({ 
        dni: updateAuthorDto.dni,
        _id: { $ne: id } // excluir el autor actual
      });
      if (existingAuthor) {
        throw new BadRequestException('Ya existe un autor con ese DNI');
      }
    }

    const author = await this.authorModel
      .findByIdAndUpdate(id, { $set: updateAuthorDto }, { new: true })
      .exec();

    if (!author) {
      throw new NotFoundException('Autor no encontrado');
    }

    return author;
  }
}