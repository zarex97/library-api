import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Editorial, EditorialSchema } from '../schemas/editorial.schema';
import { EditorialService } from './editorial.service';
import { EditorialController } from './editorial.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Editorial.name, schema: EditorialSchema },
    ]),
  ],
  controllers: [EditorialController],
  providers: [EditorialService],
  exports: [EditorialService],
})
export class EditorialModule {}
