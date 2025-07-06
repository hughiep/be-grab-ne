import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DriverGateway } from '../driver/driver.gateway';
import { DriverService } from '../driver/driver.service';
import { DriverRepository } from '../driver/driver.repository';
import { SubscriptionService } from '../rider/rider.subscription';
import { TripService } from '../trip/trip.service';
import { LocationService } from '../location/location.service';
import { KafkaService } from '../shared/kafka/kafka.service';
// TODO: split modules into smaller modules
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [],
  providers: [
    DriverService,
    DriverGateway,
    DriverRepository,
    SubscriptionService,
    TripService,
    LocationService,
    KafkaService,
  ],
})
export class UsersModule {}
