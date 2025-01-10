import { Controller, Get, Param, Req } from '@nestjs/common';
import { MaterialPrecosService } from './material_precos.service';

@Controller('material-precos')
export class MaterialPrecosController {

    constructor(
        private readonly materialPrecosService: MaterialPrecosService
    ){}

    @Get(':cd_mat')
    async valorPrazo(@Req() req: Request, @Param('cd_mat') cd_mat: string) {
        const tenantId = req['tenantId'];
        return await this.materialPrecosService.valorPrazo(tenantId,cd_mat);
    }
}
