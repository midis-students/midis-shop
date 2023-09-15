import {
  Controller,
  Get,
  UseGuards,
  Post,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
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

  @Post(':id')
  addItem(@UserField() user: User, @Param('id') id: number) {
    return this.basketService.addItem(user, id);
  }

  @Delete(':id')
  removeItem(@UserField() user: User, @Param('id') id: number) {
    return this.basketService.removeItem(user, id);
  }

  @Get()
  findAll(@UserField() user: User) {
    return this.basketService.findAll(user.id);
  }
}
