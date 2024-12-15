import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { EmpresaModule } from './empresa/empresa.module';
import { TenantMiddleware } from './utils/tenant.middleware';
import { UserModule } from './user/user.module';

@Module({
  imports: [DatabaseModule, EmpresaModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer
     .apply(TenantMiddleware)
     .forRoutes('*');
  }
}
