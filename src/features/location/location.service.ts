import type { RedisService } from '@core/redis/redis.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocationService {
  constructor(private readonly redisClient: RedisService) {}

  emitLocationUpdate() {}
}
