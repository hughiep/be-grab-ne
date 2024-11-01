import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DriverGateway } from '../driver/driver.gateway';
import { DriverService } from '../driver/driver.service';
import { DriverRepository } from '../driver/driver.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [],
  providers: [DriverService, DriverGateway, DriverRepository],
})
export class UsersModule {}
