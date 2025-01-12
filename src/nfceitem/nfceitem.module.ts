import { Module } from '@nestjs/common';
import { NfceitemController } from './nfceitem.controller';
import { NfceitemService } from './nfceitem.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NfceitemController],
  providers: [NfceitemService]
})
export class NfceitemModule {}
