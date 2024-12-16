import { Controller, Get, Req } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { User } from '../user/user.entity';

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
