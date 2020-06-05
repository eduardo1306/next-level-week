import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  Column,
} from 'typeorm';

import Points from './Points';
import Items from './Items';

@Entity('point_items')
export default class PointItems {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Items)
  @JoinColumn({ name: 'item_id' })
  items: Items;

  @OneToOne(() => Points)
  @JoinColumn({ name: 'point_id' })
  points: Points;

  @Column()
  item_id: number;

  @Column()
  point_id: number;
}
