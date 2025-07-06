// driver.gateway.ts

import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { DriverService } from './driver.service';
import { TripService } from '../trip/trip.service';
import { SubscriptionService } from '../rider/rider.subscription';

@WebSocketGateway()
export class DriverGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly driverService: DriverService,
    private readonly subscriptionService: SubscriptionService,
    private readonly tripService: TripService,
  ) {}

  @SubscribeMessage('driver-location')
  async handleUpdateLocation(
    @MessageBody() data: { id: number; latitude: number; longitude: number },
  ): Promise<void> {
    const { id, latitude, longitude } = data;
    await this.driverService.updateLocation(id, latitude, longitude);

    // Notify users subscribed within the radius
    this.notifyUsers(id, latitude, longitude);
  }

  @SubscribeMessage('acceptTrip')
  handleAcceptTrip(
    @MessageBody() data: { tripId: string },
    @ConnectedSocket() client: Socket,
  ): void {
    const driverId = client.id; // Assuming client ID represents driver ID
    const { tripId } = data;

    const success = this.tripService.acceptTrip(tripId, driverId);

    if (success) {
      const trip = this.tripService.getTrip(tripId);
      // Notify the rider that the trip has been accepted
      const riderSocket = this.subscriptionService.getRiderSocket(trip.riderId);
      if (riderSocket) {
        riderSocket.emit('tripAccepted', { tripId, driverId });
      }
      client.emit('tripAccepted', { tripId });
    } else {
      client.emit('tripAcceptFailed', { tripId });
    }
  }

  private notifyUsers(
    driverId: number,
    driverLat: number,
    driverLng: number,
  ): void {
    for (const subscription of this.subscriptionService.getSubscriptions()) {
      const distance = this.calculateDistance(
        driverLat,
        driverLng,
        subscription.latitude,
        subscription.longitude,
      );
      if (distance <= subscription.radius) {
        subscription.socket.emit('driverLocationUpdate', {
          driverId,
          latitude: driverLat,
          longitude: driverLng,
        });
      }
    }
  }

  // Haversine formula to calculate distance between two points
  private calculateDistance(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number,
  ): number {
    const toRad = (value: number): number => (value * Math.PI) / 180;

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}
