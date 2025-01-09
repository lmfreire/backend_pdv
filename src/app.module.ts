import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { EmpresaModule } from './empresa/empresa.module';
import { TenantMiddleware } from './utils/tenant.middleware';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { NfceseqModule } from './nfceseq/nfceseq.module';
import { MaterialModule } from './material/material.module';
import { EmpresaOrgModule } from './empresa_org/empresa_org.module';
import { ClienteModule } from './cliente/cliente.module';
import { EstoqueModule } from './estoque/estoque.module';
import { MaterialsacModule } from './materialsac/materialsac.module';

@Module({
  imports: [DatabaseModule, EmpresaModule, UserModule, ConfigModule.forRoot({
    isGlobal: true,
  }), NfceseqModule, MaterialModule, EmpresaOrgModule, ClienteModule, EstoqueModule, MaterialsacModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer
     .apply(TenantMiddleware)
     .exclude('/empresa/empresas')
     .forRoutes('*');
  }
}
