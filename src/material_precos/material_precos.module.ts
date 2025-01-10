import { Module } from '@nestjs/common';
import { MaterialPrecosController } from './material_precos.controller';
import { MaterialPrecosService } from './material_precos.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [MaterialPrecosController],
  providers: [MaterialPrecosService]
})
export class MaterialPrecosModule {}
