import { Body, Controller, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ){}

    @Post('login')
    async findAll(@Req() req: Request, @Body() data: {login: string, password: string}) {
        const tenantId = req['tenantId'];

        const result = await this.userService.loginUser(tenantId, data)

        return result;
    }
}
