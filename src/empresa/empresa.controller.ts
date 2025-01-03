import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { EmpresaService } from './empresa.service';

@Controller('empresa')
export class EmpresaController {

    constructor(
        private readonly empresaService: EmpresaService
    ){}

    @Get('empresas')
    async getEmpresas(){
        return await this.empresaService.findEmpresas();
    }
}
