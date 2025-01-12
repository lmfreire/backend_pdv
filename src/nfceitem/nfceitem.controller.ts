import { Body, Controller, Post, Req } from '@nestjs/common';
import { NfceitemService } from './nfceitem.service';
import { BuscaPvItemDTO, NfceItemDTO } from './pvitem.dto';

@Controller('nfceitem')
export class NfceitemController {

    constructor(
        private readonly nfceitemService: NfceitemService
    ){}

    @Post()
    async inserirItensPedido(
        @Req() req: Request,
        @Body() data: NfceItemDTO 
    ) {
        const tenantId = req['tenantId'];
        return await this.nfceitemService.inserirItensPedido(tenantId, data);

    }
}
