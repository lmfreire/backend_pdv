import { Body, Controller, Post, Req } from '@nestjs/common';
import { MaterialsacService } from './materialsac.service';

@Controller('materialsac')
export class MaterialsacController {

    constructor(
        private readonly materialsacService: MaterialsacService
    ){}

    @Post('materiais_composicao')
    async getMateriaisComposicao(@Req() req: Request, @Body() data: {cd_mat: string, cd_fil: string, cd_arm: string}){
        const tenantId = req['tenantId'];
        
        return await this.materialsacService.materiaisComposicao(tenantId, data);
    }
}
