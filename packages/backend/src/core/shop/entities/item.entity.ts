import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('items')
export class ItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  price: number;
}
