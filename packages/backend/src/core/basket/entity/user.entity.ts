import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@/core/user/entities/user';

@Entity('basket')
export class Basket {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (auth) => auth.basket)
  user: User;

  @Column()
  count: number;
}
