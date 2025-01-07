import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ClienteService } from './cliente.service';

@Controller('cliente')
export class ClienteController {

    constructor(
            private readonly clienteService: ClienteService
    ){}

    @Get(':cd_cli')
    async getCliente(@Req() req: Request, @Param('cd_cli') cd_cli: string){
        const tenantId = req['tenantId'];
        return await this.clienteService.getCliente(tenantId, cd_cli);
    }
}
