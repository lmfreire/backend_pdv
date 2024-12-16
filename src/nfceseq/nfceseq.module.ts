import { Module } from '@nestjs/common';
import { NfceseqController } from './nfceseq.controller';
import { NfceseqService } from './nfceseq.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NfceseqController],
  providers: [NfceseqService]
})
export class NfceseqModule {}
