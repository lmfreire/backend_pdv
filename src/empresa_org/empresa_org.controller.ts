import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { EmpresaOrgService } from './empresa_org.service';

@Controller('empresa-org')
export class EmpresaOrgController {

    constructor(
        private readonly empresaOrgService: EmpresaOrgService
    ){}

    @Get('vendedor/:cd_fil')
    async getVendedores(@Req() req: Request, @Param('cd_fil') cd_fil: string){
        const tenantId = req['tenantId'];
        return await this.empresaOrgService.tipoVendedor(tenantId, cd_fil);
    }
    @Get('estoque/:cd_fil')
    async getEstoque(@Req() req: Request, @Param('cd_fil') cd_fil: string){
        const tenantId = req['tenantId'];
        return await this.empresaOrgService.tipoEstoque(tenantId, cd_fil);
    }
}
