import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

import { KafkaService } from '../shared/kafka/kafka.service';
import { RedisService } from '../shared/redis/redis.service';

@Injectable()
export class LocationService implements OnModuleInit, OnModuleDestroy {
  private readonly key = 'drivers';

  constructor(
    private readonly kafkaService: KafkaService,
    private readonly redisClient: RedisService,
  ) {}

  onModuleInit() {
    this.kafkaService.consumeLocationUpdates(this.updateLocation.bind(this));
  }

  async onModuleDestroy() {
    await this.redisClient.quit();
  }

  // Update a driver's location
  async updateLocation(
    driverId: string,
    latitude: number,
    longitude: number,
  ): Promise<void> {
    await this.redisClient.geoadd(this.key, longitude, latitude, driverId);
  }

  // Get a driver's current location
  async getLocation(
    driverId: string,
  ): Promise<{ latitude: number; longitude: number } | null> {
    const positions = await this.redisClient.geopos(this.key, driverId);
    if (positions && positions[0]) {
      const [longitude, latitude] = positions[0];
      return {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      };
    }
    return null;
  }

  // Find nearby drivers within a radius (in kilometers)
  async findNearbyDrivers(latitude: number, longitude: number, radius: number) {
    const results = await this.redisClient.georadius(
      this.key,
      longitude,
      latitude,
      radius,
      'km',
    );
    return results;
  }

  // Remove a driver from tracking
  // async removeDriver(driverId: string): Promise<void> {
  //   await this.redisClient.zrem(this.key, driverId);
  // }
}
