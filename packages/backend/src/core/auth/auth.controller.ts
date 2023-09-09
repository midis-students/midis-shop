import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @Post('/register')
  register(@Body() registerDto: LoginDto) {
    return this.authService.register(registerDto);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }
}
