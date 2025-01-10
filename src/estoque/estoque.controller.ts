import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { EstoqueService } from './estoque.service';
import { ErrorResponse } from '../utils/error.resource';
import { Response } from 'express';

@Controller('estoque')
export class EstoqueController {

    constructor(
        private readonly estoqueService: EstoqueService
    ){}


    @Post('produto_estoque')
    async getProdutoEstoque(
        @Req() req: Request,
        @Res() res: Response,
        @Body() data: {cd_mat: string, cd_fil: string, cd_arm: string}
    ){
        const tenantId = req['tenantId'];
        const result =  await this.estoqueService.getProdutoEstoque(tenantId, data);

        if(result.isError()){
            const error = result.error
            return res.status(error.status).send(new ErrorResponse(error.message));
        }

        return res.status(HttpStatus.ACCEPTED).send(result.value);
    }
}
