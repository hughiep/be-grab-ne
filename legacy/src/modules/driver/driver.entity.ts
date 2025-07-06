import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  licenseNumber: string;

  @Column('point', { nullable: true })
  location: string;

  @Column({ default: true })
  availability: boolean;

  // Spatial index
  @Index({ spatial: true })
  @Column('geography', { nullable: true })
  locationPoint: string;
}
