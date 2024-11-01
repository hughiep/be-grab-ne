import { Module } from '@nestjs/common';
import { RedisService } from '../shared/redis/redis.service';

@Module({
  imports: [RedisService],
  controllers: [],
  providers: [RedisService],
  exports: [],
})
export class LocationModule {}
