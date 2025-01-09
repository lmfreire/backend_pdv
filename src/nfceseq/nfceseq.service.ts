import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import getTenantRepository from 'src/utils/get.tenant.repository';
import { DataSource, Repository } from 'typeorm';
import { Nfceseq } from './nfceseq.entity';
import { Filial } from './filial.entity';
import { Repres } from './repres.entity';
import { Result } from 'src/utils/result';
import { HttpError } from 'src/utils/httpError';
import { Nfce } from './nfce.entity';
import { Nfcepag } from './nfcepag.entity';

@Injectable()
export class NfceseqService {

    constructor(
        @Inject('TENANT_DATA_SOURCE') 
        private readonly getTenantDataSource: (tenantId: string) => Promise<DataSource>
    ){}

    async getNfce(tentat: string){
        const repository: Repository<Nfceseq> = await getTenantRepository(tentat, Nfceseq, this.getTenantDataSource);

        return await repository.find()
    }

    async bloquearTerminal(tenant: string, data: {id_terminal: string; user_login: string}){
        const repository: Repository<Nfceseq> = await getTenantRepository(tenant, Nfceseq, this.getTenantDataSource);

        const repres = await repository.findOne({
            where: {
                id: data.id_terminal
            }
        })

        if(repres.cd_rep){
            const repositoryRepres: Repository<Repres> = await getTenantRepository(tenant, Repres, this.getTenantDataSource);
            
            const rep = await repositoryRepres.findOne({
                where: {
                    cd_rep: repres.cd_rep
                }
            })

            if(rep.nm_rep){
                return new Result(null, 
                    new HttpError(`Já existe um representante cadastrado neste terminal: ${rep.nm_rep}`, HttpStatus.CONFLICT)
                )
            }            
        }

        const res = await repository.update(data.id_terminal, {
            login_ativo : data.user_login,
            sn_ativo: '1'
        })        

        return new Result(res,null)
    }

    async listagemTerminal(tenant: string) {
        const repositoryNfceseq: Repository<Nfceseq> = await getTenantRepository(tenant, Nfceseq, this.getTenantDataSource);
        
        const nfceseq = await repositoryNfceseq.createQueryBuilder()
            .select('nfceseq')
            .from(Nfceseq,'nfceseq')
            .innerJoinAndMapOne('nfceseq.cd_fil', Filial, 'filial', "filial.cd_fil = nfceseq.cd_fil and nfceseq .sn_ativo = '0'")            
            .getMany();

        

        return nfceseq        
    }

    async getNfceAtual(tenant: string, data: {nr_serie: string; cd_fil: string;}){
        const repository: Repository<Nfceseq> = await getTenantRepository(tenant, Nfceseq, this.getTenantDataSource);

        let retorno = await repository.findOne({where: {
            nr_serie: data.nr_serie,
            cd_fil: data.cd_fil
        }})

        if (retorno && retorno.nr_nfce != null) {
            retorno.nr_nfce = String(retorno.nr_nfce).padStart(9, '0');
        }
        
        return {"nr_nfce": retorno.nr_nfce} 
    }

    async deslogar(tenant: string, data: {nr_serie: string; cd_fil: string; usr_login: string}){
        const repository: Repository<Nfceseq> = await getTenantRepository(tenant, Nfceseq, this.getTenantDataSource);

        let retorno = await repository.findOne({where: {
            nr_serie: data.nr_serie,
            cd_fil: data.cd_fil
        }})

        if (retorno && retorno.login_ativo != data.usr_login) {
            return new Result(null, 
                new HttpError(`Outro Usuário está ativo neste momento ou Terminal bloqueado momentaneamente:`, HttpStatus.CONFLICT)
            )
        }
        
        return new Result(retorno,null);

    }


    async atualizarNovaNfceseq(tenant: string, data: {nr_serie: string; cd_fil: string; nr_nfce: string;}){
        const repository: Repository<Nfce> = await getTenantRepository(tenant, Nfce, this.getTenantDataSource);        

        let nfce = await repository.findOne({where: {
            nr_serie: data.nr_serie,
            cd_fil: data.cd_fil,
            nr_nfce: data.nr_nfce
        }})

        if (nfce && Number(nfce.sn_enc) != 0) {
            const repository: Repository<Nfceseq> = await getTenantRepository(tenant, Nfceseq, this.getTenantDataSource);
            nfce.nr_nfce = String(Number(data.nr_nfce) + 1).padStart(9, '0');
            await repository.update(
                {nr_serie: data.nr_serie, cd_fil: data.cd_fil},
                {nr_nfce: String(Number(data.nr_nfce) + 1).padStart(9, '0')}
            )
        }

        return nfce
    }

    async buscarNfcepag(tenant: string, data: {nr_nfce: string; cd_fil: string; nr_serie: string;}){
        const repository: Repository<Nfcepag> = await getTenantRepository(tenant, Nfcepag, this.getTenantDataSource); 
    
        let retorno = await repository.findOne({where: {
            nr_nfce: data.nr_nfce,
            cd_fil: data.cd_fil,
            nr_serie: data.nr_serie
        }})

        return retorno
    }
}
