// src/schemas/libro.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Author } from './author.schema';
import { Editorial } from './editorial.schema';

@Schema()
export class Libro {
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Author' }] })
  autores: Author[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Editorial', required: true })
  editorial: Editorial;

  @Prop({ required: true })
  titulo: string;

  @Prop({ required: true })
  categoriaLiteraria: string;

  @Prop({ required: true })
  precio: number;

  @Prop({ required: true })
  fechaLanzamiento: Date;

  @Prop({ required: true })
  descripcion: string;
}

export type LibroDocument = Libro & Document;
export const LibroSchema = SchemaFactory.createForClass(Libro);