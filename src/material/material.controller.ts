import { Controller, Get, Param, Req } from '@nestjs/common';
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
    
    @Get('produtos/:cd_similar')
    async getProdutoPorCodSimilar(@Req() req: Request, @Param('cd_similar') cd_similar: string){
        const tenantId = req['tenantId']
        return await this.materialService.getProdutoPorCodSimilar(tenantId, cd_similar);
    }

}
