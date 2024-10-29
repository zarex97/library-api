import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Libro, LibroSchema } from '../schemas/libro.schema';
import { LibroService } from './libro.service';
import { LibroController } from './libro.controller';
import { AuthorModule } from '../author/author.module';
import { EditorialModule } from '../editorial/editorial.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Libro.name, schema: LibroSchema },
    ]),
    AuthorModule,
    EditorialModule,
  ],
  controllers: [LibroController],
  providers: [LibroService],
})
export class LibroModule {}