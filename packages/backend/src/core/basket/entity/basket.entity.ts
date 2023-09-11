import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@/core/user/entities/user.entity';
import { Item } from '@/core/shop/entities/item.entity';

@Entity('basket')
export class Basket {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (auth) => auth.basket)
  user: User;

  @OneToOne(() => Item)
  @JoinColumn()
  item: Item;

  @Column()
  count: number;
}
