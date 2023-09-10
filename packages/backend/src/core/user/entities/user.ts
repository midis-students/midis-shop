import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../auth.enum';
import { Basket } from '@/core/basket/entity/user.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column('varchar', { array: true, default: [Role.User] })
  roles: Role[];

  @OneToMany(() => Basket, (basket) => basket.user)
  basket: Basket[];
}
