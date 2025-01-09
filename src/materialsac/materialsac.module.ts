import { Module } from '@nestjs/common';
import { MaterialsacController } from './materialsac.controller';
import { MaterialsacService } from './materialsac.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [MaterialsacController],
  providers: [MaterialsacService]
})
export class MaterialsacModule {}
