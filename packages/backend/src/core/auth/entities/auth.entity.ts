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

  @Column('string')
  roles: Role[];
}
