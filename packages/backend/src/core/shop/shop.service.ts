import { Injectable } from '@nestjs/common';
import { ItemEntity } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/upload.dto';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(ItemEntity)
    private itemRepository: Repository<ItemEntity>
  ) {}

  findById(id: number) {
    return this.itemRepository.findOne({
      where: {
        id,
      },
    });
  }

  findAll() {
    return this.itemRepository.find();
  }

  async create(dto: CreateItemDto) {
    const item = this.itemRepository.create(dto);
    await this.itemRepository.save(item);
    return item;
  }

  update(id: number, dto: CreateItemDto) {
    return this.itemRepository.update({ id }, dto);
  }

  async delete(id: number) {
    await this.itemRepository.delete({ id });
    return { ok: true };
  }
}
