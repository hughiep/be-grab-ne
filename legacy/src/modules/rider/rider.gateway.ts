// rider.gateway.ts

import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TripService } from '../trip/trip.service';
import { SubscriptionService } from './rider.subscription';

@WebSocketGateway()
export class RiderGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly subscriptionService: SubscriptionService,
    private readonly tripService: TripService,
  ) {}

  @SubscribeMessage('subscribeToDrivers')
  handleSubscribe(
    @MessageBody()
    data: { latitude: number; longitude: number; radius: number },
    @ConnectedSocket() client: Socket,
  ): void {
    const { latitude, longitude, radius } = data;
    this.subscriptionService.addSubscription(client.id, {
      socket: client,
      latitude,
      longitude,
      radius,
    });
  }

  @SubscribeMessage('bookTrip')
  async handleBookTrip(
    @MessageBody()
    data: {
      pickupLat: number;
      pickupLng: number;
      destinationLat: number;
      destinationLng: number;
    },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const riderId = client.id; // Assuming client ID represents rider ID
    const { pickupLat, pickupLng, destinationLat, destinationLng } = data;

    const trip = await this.tripService.createTrip(
      riderId,
      pickupLat,
      pickupLng,
      destinationLat,
      destinationLng,
    );

    if (trip) {
      client.emit('tripCreated', {
        tripId: trip.tripId,
        driverId: trip.driverId,
      });
    } else {
      client.emit('noDriversAvailable');
    }
  }

  handleDisconnect(@ConnectedSocket() client: Socket): void {
    this.subscriptionService.removeSubscription(client.id);
  }
}
