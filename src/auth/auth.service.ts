import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import authConfig from './config/auth.config';
import type { ConfigType } from '@nestjs/config';


@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsersService)) private readonly userService: UsersService,

        @Inject(authConfig.KEY)
        private readonly authConfiguration: ConfigType<typeof authConfig>
    ){}
    login(email: string, psw: string){
        console.log(this.authConfiguration)
        return 
    }
}
