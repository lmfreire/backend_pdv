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

    @Get('kititens/:cd_kit')
    async getKitByCdKit(@Req() req: Request, @Param('cd_kit') cd_kit: string){
        const tenantId = req['tenantId']
        return await this.materialService.getKitByCdKit(tenantId, cd_kit);
    }

    @Get(':cd_mat')
    async getMaterialByCdMat(@Req() req: Request, @Param('cd_mat') cd_mat: string){
        const tenantId = req['tenantId']
        return await this.materialService.getMaterialByCdMat(tenantId, cd_mat);
    }

}
