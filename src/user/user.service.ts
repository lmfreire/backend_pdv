import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Empresa } from '../empresa/empresa.entity';
import { User } from './user.entity';
var md5 = require('md5');

@Injectable()
export class UserService {

    constructor(
        @Inject('TENANT_DATA_SOURCE') 
        private readonly getTenantDataSource: (tenantId: string) => Promise<DataSource>
    ){}

    async loginUser(tentat: string, data : {login: string, password: string}){
        const userRepository = await this.getTenantRepository(tentat, User);

        data.password = md5(data.password)

        const user = await userRepository.findOneBy({
            login: data.login,
            pswd: data.password
        })

        return user
    }

    async getTenantRepository<T>(tenantId: string, entity: new () => T) {
    const tenantDataSource = await this.getTenantDataSource(tenantId);
    return tenantDataSource.getRepository(entity);
    }
}
