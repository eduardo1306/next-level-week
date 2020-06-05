import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Column,
} from 'typeorm';

import Points from './Points';
import Items from './Items';

@Entity('point_items')
export default class PointItems {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Items)
  @JoinColumn({ name: 'item_id' })
  items: Items;

  @ManyToOne(() => Points)
  @JoinColumn({ name: 'point_id' })
  points: Points;

  @Column()
  item_id: number;

  @Column()
  point_id: number;
}
