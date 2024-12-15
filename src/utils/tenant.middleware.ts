import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { EmpresaService } from '../empresa/empresa.service';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
    constructor(
        private readonly empresaService: EmpresaService
    ){}
    async use(req: Request, res: Response, next: NextFunction) {
    const tenantId = req.headers['x-tenant-id'] as string; // Pode ser via subdomínio, parâmetro, etc.
    if (!tenantId) {
        throw new Error('Tenant ID is required');
    }

    const tenantName = await this.empresaService.findEmpresaByCodigo(tenantId);
    
    req['tenantId'] = tenantName.nm_db;
    next();
    }
}
