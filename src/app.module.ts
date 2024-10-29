import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthorModule } from './author/author.module';
import { EditorialModule } from './editorial/editorial.module';
import { LibroModule } from './libro/libro.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/libreria'),
    AuthorModule,
    EditorialModule,
    LibroModule
  ],
})
export class AppModule {}