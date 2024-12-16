import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import getTenantRepository from 'src/utils/get.tenant.repository';
var md5 = require('md5');

@Injectable()
export class UserService {

    constructor(
        @Inject('TENANT_DATA_SOURCE') 
        private readonly getTenantDataSource: (tenantId: string) => Promise<DataSource>
    ){}

    async loginUser(tentat: string, data : {login: string, password: string}){
        const userRepository = await getTenantRepository(tentat, User, this.getTenantDataSource);

        data.password = md5(data.password)

        const user = await userRepository.findOneBy({
            login: data.login,
            pswd: data.password
        })

        return user
    }

    
}
