import { Module } from '@nestjs/common';
import { PvController } from './pv.controller';
import { PvService } from './pv.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PvController],
  providers: [PvService]
})
export class PvModule {}
