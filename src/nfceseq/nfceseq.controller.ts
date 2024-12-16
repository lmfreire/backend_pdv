import { Controller, Get, Req } from '@nestjs/common';
import { NfceseqService } from './nfceseq.service';

@Controller('nfceseq')
export class NfceseqController {

    constructor(
        private readonly nfceseqService: NfceseqService
    ){}

    @Get()
    async getNfce(@Req() req: Request){
        const tenantId = req['tenantId'];
        return await this.nfceseqService.getNfce(tenantId);
    }

}
