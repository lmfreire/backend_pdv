import { Module } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { EmpresaController } from './empresa.controller';
import { empresaProviders } from './empresa.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [EmpresaService, ...empresaProviders],
  controllers: [EmpresaController],
  exports: [EmpresaService]
})
export class EmpresaModule {}
