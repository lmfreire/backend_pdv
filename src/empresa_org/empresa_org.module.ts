import { Module } from '@nestjs/common';
import { EmpresaOrgController } from './empresa_org.controller';
import { EmpresaOrgService } from './empresa_org.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [EmpresaOrgController],
  providers: [EmpresaOrgService]
})
export class EmpresaOrgModule {}
