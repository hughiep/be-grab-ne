// kafka service
import { Injectable } from '@nestjs/common';

import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaService {
  private kafka: Kafka;

  constructor() {
    console.log('Kafka service initialized');
    this.kafka = new Kafka({
      clientId: 'my-app',
      brokers: ['localhost:9092'],
    });
  }

  async sendMessage(topic: string, message: string) {
    const producer = this.kafka.producer();
    await producer.connect();
    await producer.send({
      topic,
      messages: [{ value: message }],
    });
    await producer.disconnect();
  }

  async consumeLocationUpdates(
    callback: (driverId: string, latitude: number, longitude: number) => void,
  ) {
    const consumer = this.kafka.consumer({ groupId: 'location-group' });
    await consumer.connect();
    await consumer.subscribe({ topic: 'driver-locations' });
    await consumer.run({
      eachMessage: async ({ message }) => {
        const { driverId, latitude, longitude } = JSON.parse(
          message.value.toString(),
        );
        callback(driverId, latitude, longitude);
      },
    });
  }
}
