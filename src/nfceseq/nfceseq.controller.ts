import { Body, Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { NfceseqService } from './nfceseq.service';
import { Response } from 'express';
import { ErrorResponse } from 'src/utils/error.resource';

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
    @Post('nfce_atual')
    async getNfceAtual(@Req() req: Request, @Body() data: {nr_serie: string; cd_fil: string;}){
        const tenantId = req['tenantId'];
        
        return await this.nfceseqService.getNfceAtual(tenantId, data);
    }

    @Post('bloquear_terminal')
    async bloquearTerminal(
        @Req() req: Request,
        @Res() res: Response,
        @Body() data: {id_terminal: string, user_login: string}
    ){
        const tenantId = req['tenantId'];
        const result =  await this.nfceseqService.bloquearTerminal(tenantId, data);

        if(result.isError()){
            const error = result.error
            return res.status(error.status).send(new ErrorResponse(error.message));
        }

        return res.status(HttpStatus.ACCEPTED).send();
    }

    @Get('terminal')
    async getTerminal(@Req() req: Request){
        const tenantId = req['tenantId'];
        return await this.nfceseqService.listagemTerminal(tenantId);
    }

}
