import { DataSource, Repository } from 'typeorm';
import { Driver } from './driver.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DriverRepository extends Repository<Driver> {
  constructor(private dataSource: DataSource) {
    super(Driver, dataSource.createEntityManager());
  }

  async updateLocation(driverId: number, lat: number, long: number) {
    console.log(`Driver ${driverId} is now at ${lat} ${long}`);
  }

  async updateAvailability(driverId: number, availability: boolean) {
    console.log(
      `Driver ${driverId} is now ${availability ? 'available' : 'unavailable'}`,
    );
  }
}
