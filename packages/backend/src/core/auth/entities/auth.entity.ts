import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../auth.enum';

@Entity('users')
export class AuthEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column('varchar', { array: true, default: [Role.User] })
  roles: Role[];
}
