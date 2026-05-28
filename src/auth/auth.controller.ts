import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  login(@Body() user: { email: string, psw: string }) {
    return this.authService.login(user.email, user.psw)
  }

  @Post('signup')
  signup(@Body() createUser: CreateUserDto) {
    return this.authService.signup(createUser)
  }
}
