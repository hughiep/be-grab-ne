import { Injectable } from '@nestjs/common';
import { DriverRepository } from './driver.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(DriverRepository)
    private readonly driverRepository: DriverRepository,
  ) {}

  async updateLocation(driverId: number, lat: number, long: number) {
    return this.driverRepository.updateLocation(driverId, lat, long);
  }

  async updateAvailability(driverId: number, availability: boolean) {
    return this.driverRepository.updateAvailability(driverId, availability);
  }
}
