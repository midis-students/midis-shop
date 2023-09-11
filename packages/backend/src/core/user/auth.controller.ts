import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Roles, UserField } from '@/core/user/auth.decorator';
import { User } from '@/core/user/entities/user.entity';
import { AuthGuard } from '@/core/user/auth.guard';
import { Role } from '@/core/user/auth.enum';

@Controller('auth')
@Roles(Role.User)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/me')
  @UseGuards(AuthGuard)
  me(@UserField() user: User) {
    return this.authService.findOne(user.id);
  }

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
