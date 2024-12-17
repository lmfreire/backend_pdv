import { Body, Controller, Get, Post, Req } from '@nestjs/common';
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

    @Post('bloquear_terminal')
    async bloquearTerminal(@Req() req: Request, @Body() data: {id_terminal: string, user_login: string}){
        const tenantId = req['tenantId'];
        return await this.nfceseqService.bloquearTerminal(tenantId, data);
    }

}
