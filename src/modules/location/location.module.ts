import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { KafkaService } from '../shared/kafka/kafka.service';
import { RedisService } from '../shared/redis/redis.service';

@Module({
  imports: [],
  controllers: [],
  providers: [LocationService, KafkaService, RedisService],
  exports: [],
})
export class LocationModule {}
