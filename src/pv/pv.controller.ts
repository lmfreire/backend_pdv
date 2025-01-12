import { Body, Controller, Post, Req } from '@nestjs/common';
import { PvService } from './pv.service';
import { BuscaPvDTO } from './pv.dto';

@Controller('pv')
export class PvController {

    constructor(
        private readonly pvService: PvService
    ){}

    @Post('')
    async validarNumeroPedido(
        @Req() req: Request,
        @Body() data: BuscaPvDTO
    ){
        const tenantId = req['tenantId'];
        const result = await this.pvService.validarNumeroPedido(tenantId, data);

        return result
    }
}
