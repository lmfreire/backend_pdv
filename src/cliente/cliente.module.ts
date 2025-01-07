import { Module } from '@nestjs/common';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ClienteController],
  providers: [ClienteService]
})
export class ClienteModule {}
