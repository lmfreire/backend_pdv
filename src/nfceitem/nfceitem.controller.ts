import { Body, Controller, Post, Req } from '@nestjs/common';
import { NfceitemService } from './nfceitem.service';
import { BuscaPvItemDTO, NfceItemDTO } from './pvitem.dto';
import { ProdutoDTO } from './produto.dto';
import { NotaDTO } from './nota.dto';

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
    
    @Post('itens')
    async inserirItens(
        @Req() req: Request,
        @Body() data: ProdutoDTO 
    ) {
        const tenantId = req['tenantId'];
        return await this.nfceitemService.inserirItens(tenantId, data);

    }

    @Post('atualiza_nota')
    async atualizarNota(
        @Req() req: Request,
        @Body() data: NotaDTO 
    ) {
        const tenantId = req['tenantId'];
        return await this.nfceitemService.atualizarNota(tenantId, data);

    }

}
