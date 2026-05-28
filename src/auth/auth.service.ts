import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import authConfig from './config/auth.config';
import type { ConfigType } from '@nestjs/config';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,

    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,

    private readonly jwtService: JwtService,
  ) {}
  public async login(email: string, psw: string) {
    const token = await this.jwtService.signAsync(
      {
        sub: email,
      },
      {
        secret: this.authConfiguration.secret,
        expiresIn: +(this.authConfiguration.expiresIn ?? 3600 ) ,
      },
    );
    return token
  }
  public async signup(createUser: CreateUserDto) {
    return await this.userService.create(createUser);
  }
}
