// Create redis service

import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly client: Redis;

  constructor() {
    this.client = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
  }

  async get(key: string): Promise<string> {
    return this.client.get(key);
  }

  async set(key: string, value: string) {
    return this.client.set(key, value);
  }

  async del(key: string) {
    return this.client.del(key);
  }

  // Geo spatial commands
  async geoadd(
    key: string,
    longitude: number,
    latitude: number,
    member: string,
  ) {
    return this.client.geoadd(key, longitude, latitude, member);
  }

  async geopos(key: string, member: string) {
    return this.client.geopos(key, member);
  }

  async geodist(key: string, member1: string, member2: string) {
    return this.client.geodist(key, member1, member2);
  }

  async georadius(
    key: string,
    longitude: number,
    latitude: number,
    radius: number,
    unit: 'm' | 'km' | 'mi' | 'ft',
  ) {
    return this.client.georadius(key, longitude, latitude, radius, unit);
  }

  async georadiusbymember(
    key: string,
    member: string,
    radius: number,
    unit: 'm' | 'km' | 'mi' | 'ft',
  ) {
    return this.client.georadiusbymember(key, member, radius, unit);
  }

  async geohash(key: string, member: string) {
    return this.client.geohash(key, member);
  }
}
