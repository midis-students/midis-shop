import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateItemDto } from './dto/upload.dto';
import { AuthGuard } from '../user/auth.guard';
import { Role } from '@/core/user/auth.enum';
import { Roles } from '@/core/user/auth.decorator';
@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Get()
  findAll() {
    return this.shopService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.shopService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  create(@Body() body: CreateItemDto) {
    return this.shopService.create(body);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  update(@Param('id') id: number, @Body() body: CreateItemDto) {
    return this.shopService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  delete(@Param('id') id: number) {
    return this.shopService.delete(id);
  }
}
