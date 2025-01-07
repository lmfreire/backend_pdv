import { Body, Controller, Post, Req } from '@nestjs/common';
import { EmpresaOrgService } from './empresa_org.service';

@Controller('empresa-org')
export class EmpresaOrgController {

    constructor(
        private readonly empresaOrgService: EmpresaOrgService
    ){}

    @Post('vendedor')
    async getVendedores(@Req() req: Request, @Body() data: {cd_fil: string}){
        const tenantId = req['tenantId'];
        return await this.empresaOrgService.tipoVendedor(tenantId, data);
    }
    @Post('estoque')
    async getEstoque(@Req() req: Request, @Body() data: {cd_fil: string}){
        const tenantId = req['tenantId'];
        return await this.empresaOrgService.tipoEstoque(tenantId, data);
    }
}
