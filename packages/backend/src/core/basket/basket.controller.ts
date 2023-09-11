import { Controller, Get, UseGuards } from '@nestjs/common';
import { BasketService } from '@/core/basket/basket.service';
import { Roles, UserField } from '@/core/user/auth.decorator';
import { User } from '@/core/user/entities/user.entity';
import { Role } from '@/core/user/auth.enum';
import { AuthGuard } from '@/core/user/auth.guard';

@Controller('basket')
@Roles(Role.User)
@UseGuards(AuthGuard)
export class BasketController {
  constructor(private basketService: BasketService) {}

  @Get()
  findAll(@UserField() user: User) {
    return this.basketService.findAll(user.id);
  }
}
