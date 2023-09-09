import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Roles } from './auth.decorator';
import { Role } from './auth.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.authService.findById(+id);
  }

  @Get(':email')
  findByEmail(@Param('email') id: string) {
    return this.authService.findByEmail(+id);
  }

  @Roles(Role.Admin)
  @Get(':id')
  getPassword(@Param('id') id: string) {
    return this.authService.getPassword(+id);
  }
}
