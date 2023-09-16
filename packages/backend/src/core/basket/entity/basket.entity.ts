import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@/core/user/entities/user.entity';
import { Item } from '@/core/shop/entities/item.entity';

@Entity('basket')
export class Basket {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (auth) => auth.basket)
  user: User;

  @ManyToOne(() => Item, { onDelete: 'CASCADE' })
  @JoinColumn()
  item: Item;
}
