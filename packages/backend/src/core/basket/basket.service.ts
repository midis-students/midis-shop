import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Basket } from '@/core/basket/entity/basket.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { AuthService } from '../user/auth.service';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Basket) private basketResository: Repository<Basket>,
    private userService: AuthService
  ) {}

  async addItem(user: User, id: number) {
    const item = await this.basketResository.findOne({
      where: { id },
    });

    if (!item) throw new NotFoundException('item not found');

    if (user.basket) {
      user.basket.push(item);
    } else {
      user.basket = [item];
    }
    await this.userService.save(user);
    return user.basket;
  }

  async removeItem(user: User, id: number) {
    const itemIndex = user.basket.findIndex((tempItem) => tempItem.id == id);
    user.basket.splice(itemIndex, 1);
    await this.userService.save(user);
    return user.basket;
  }

  async clear(user: User) {
    user.basket = [];
    this.userService.save(user);
    return user.basket;
  }

  findOne(userId: number, id: number) {
    return this.basketResository.findOne({
      where: { id, user: { id: userId } },
    });
  }

  findAll(userId: number) {
    return this.basketResository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }
}
