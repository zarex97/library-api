import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Editorial {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  direccion: string;

  @Prop({ required: true, unique: true })
  cuit: string;
}

export type EditorialDocument = Editorial & Document;
export const EditorialSchema = SchemaFactory.createForClass(Editorial);