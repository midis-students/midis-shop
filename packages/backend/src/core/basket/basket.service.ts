import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Basket } from '@/core/basket/entity/basket.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { AuthService } from '../user/auth.service';
import { ShopService } from '../shop/shop.service';
import { Item } from '../shop/entities/item.entity';

@Injectable()
export class BasketService {
  constructor(
    private userService: AuthService,
    @InjectRepository(Basket) private basketResository: Repository<Basket>,
    @InjectRepository(Item) private shopResository: Repository<Item>
  ) {}

  async addItem(user: User, id: number) {
    const item = await this.shopResository.findOne({
      where: { id },
    });

    if (!item) throw new NotFoundException('item not found');

    let basket = await this.basketResository.findOne({
      where: { user: { id: user.id }, item: { id } },
      relations: ['item'],
    });
    if (!basket) {
      basket = this.basketResository.create({
        user,
        item,
      });
    }

    await this.basketResository.save(basket);
    return this.basketResository.find({
      where: {
        user: {
          id: user.id,
        },
      },
      relations: ['item'],
    });
  }

  async removeItem(user: User, id: number) {
    const basket = await this.basketResository.findOne({
      where: { user: { id: user.id }, item: { id } },
      relations: ['item'],
    });

    if (!basket) throw new NotFoundException('basket not found');

    await this.basketResository.delete({ id: basket.id });

    return this.basketResository.find({
      where: {
        user: {
          id: user.id,
        },
      },
      relations: ['item'],
    });
  }

  findOne(userId: number, id: number) {
    return this.basketResository.findOne({
      where: { id, user: { id: userId } },
      relations: ['item'],
    });
  }

  findAll(userId: number) {
    return this.basketResository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['item'],
    });
  }
}
