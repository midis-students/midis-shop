import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Basket } from '@/core/basket/entity/basket.entity';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('text', { default: '' })
  image: string;

  @Column()
  price: number;

  @OneToMany(() => Basket, (a) => a.item)
  baskets: Basket[];
}
