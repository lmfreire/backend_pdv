import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { MaterialsacService } from './materialsac.service';
import { Response } from 'express';
import { ErrorResponse } from '../utils/error.resource';

@Controller('materialsac')
export class MaterialsacController {

    constructor(
        private readonly materialsacService: MaterialsacService
    ){}

    @Post('materiais_composicao')
    async getMateriaisComposicao(
        @Req() req: Request,
        @Res() res: Response, 
        @Body() data: {cd_mat: string, cd_fil: string, cd_arm: string}
    ){
        const tenantId = req['tenantId'];
        

        const result = await this.materialsacService.materiaisComposicao(tenantId, data);

        if(result.isError()){
            const error = result.error
            return res.status(error.status).send(new ErrorResponse(error.message));
        }

        return res.status(HttpStatus.ACCEPTED).send(result.value);
    }
}
