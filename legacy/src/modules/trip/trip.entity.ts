// trip.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export type TripStatus = 'pending' | 'accepted' | 'completed' | 'cancelled';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn('uuid')
  tripId: string;

  @Column()
  riderId: string;

  @Column()
  driverId: string;

  @Column('decimal', { precision: 9, scale: 6 })
  pickupLat: number;

  @Column('decimal', { precision: 9, scale: 6 })
  pickupLng: number;

  @Column('decimal', { precision: 9, scale: 6 })
  destinationLat: number;

  @Column('decimal', { precision: 9, scale: 6 })
  destinationLng: number;

  @Column({
    type: 'enum',
    enum: ['pending', 'accepted', 'completed', 'cancelled'],
    default: 'pending',
  })
  status: TripStatus;
}
