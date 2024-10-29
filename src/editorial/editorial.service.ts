import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Editorial, EditorialDocument } from '../schemas/editorial.schema';
import { CreateEditorialDto } from '../dto/editorial.dto';
import { UpdateEditorialDto } from '../dto/editorial.dto';
import { QueryUpdateEditorialDto } from '../dto/query-update.dto';

@Injectable()
export class EditorialService {
  constructor(
    @InjectModel(Editorial.name) private editorialModel: Model<EditorialDocument>
  ) {}

  async create(createEditorialDto: CreateEditorialDto): Promise<Editorial> {
    const createdEditorial = new this.editorialModel(createEditorialDto);
    return createdEditorial.save();
  }

  async findAll(): Promise<Editorial[]> {
    return this.editorialModel.find().exec();
  }

  async findOne(id: string): Promise<Editorial> {
    const editorial = await this.editorialModel.findById(id).exec();
    if (!editorial) {
      throw new NotFoundException('Editorial no encontrada');
    }
    return editorial;
  }

  async update(id: string, updateEditorialDto: CreateEditorialDto): Promise<Editorial> {
    const updatedEditorial = await this.editorialModel
      .findByIdAndUpdate(id, updateEditorialDto, { new: true })
      .exec();
    if (!updatedEditorial) {
      throw new NotFoundException('Editorial no encontrada');
    }
    return updatedEditorial;
  }

  async remove(id: string): Promise<void> {
    const result = await this.editorialModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Editorial no encontrada');
    }
  }

  async updateFields(id: string, updateFields: QueryUpdateEditorialDto): Promise<Editorial> {
    // Si se está actualizando el CUIT, verificar que no exista otro igual
    if (updateFields.cuit) {
      const existingEditorial = await this.editorialModel.findOne({
        cuit: updateFields.cuit,
        _id: { $ne: id } // Excluir la editorial actual de la búsqueda
      });
      
      if (existingEditorial) {
        throw new BadRequestException('Ya existe una editorial con ese CUIT');
      }
    }

    // Actualizar los campos proporcionados
    const updatedEditorial = await this.editorialModel
      .findByIdAndUpdate(
        id,
        { $set: updateFields },
        { new: true } // Devolver el documento actualizado
      )
      .exec();

    // Verificar si se encontró la editorial
    if (!updatedEditorial) {
      throw new NotFoundException('Editorial no encontrada');
    }

    return updatedEditorial;
  }

  async patch(id: string, updateEditorialDto: UpdateEditorialDto): Promise<Editorial> {
    // Si se está actualizando el CUIT, verificar que no exista
    if (updateEditorialDto.cuit) {
      const existingEditorial = await this.editorialModel.findOne({
        cuit: updateEditorialDto.cuit,
        _id: { $ne: id }
      });
      if (existingEditorial) {
        throw new BadRequestException('Ya existe una editorial con ese CUIT');
      }
    }

    const editorial = await this.editorialModel
      .findByIdAndUpdate(id, { $set: updateEditorialDto }, { new: true })
      .exec();

    if (!editorial) {
      throw new NotFoundException('Editorial no encontrada');
    }

    return editorial;
  }
}
