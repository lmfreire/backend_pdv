import { Controller, Get, Req } from '@nestjs/common';
import { MaterialService } from './material.service';

@Controller('material')
export class MaterialController {

    constructor(
        private readonly materialService: MaterialService
    ){}


    @Get()
    async getMaterial(@Req() req: Request){
        const tenantId = req['tenantId']
        return await this.materialService.getMaterial(tenantId);
    }

    @Get('produtos')
    async getProdutos(@Req() req: Request){
        const tenantId = req['tenantId']
        return await this.materialService.getProdutos(tenantId);
    }

}
