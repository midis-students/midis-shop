import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Basket } from '@/core/basket/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Basket) private basketResository: Repository<Basket>
  ) {}

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
