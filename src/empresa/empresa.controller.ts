import { Controller, Get, Req } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { User } from '../user/user.entity';

@Controller('empresa')
export class EmpresaController {

    constructor(
        private readonly empresaService: EmpresaService
    ){}

    @Get()
    async getEmpresas(){
        return await this.empresaService.findEmpresas();
    }

    @Get('login')
    async Login(){
        return await this.empresaService.findEmpresaByCodigo('001');
    }

    // @Get('user')
    // async findAll(@Req() request: Request) {
    //     const tenantId = request['tenantId'];

    //     const userRepository = await this.empresaService.getTenantRepository(tenantId, User);
        
    //     return userRepository.find();
    // }
}
