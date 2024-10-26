import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { DriverService } from './driver.service';

@WebSocketGateway()
export class DriverGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly driverService: DriverService) {}

  @SubscribeMessage('driver-location')
  async handleUpdateLocation(
    @MessageBody('id') id: number,
    @MessageBody('latitude') latitude: number,
    @MessageBody('longitude') longitude: number,
  ): Promise<void> {
    console.log(`Driver ${id} is now at ${latitude} ${longitude}`);
    await this.driverService.updateLocation(id, latitude, longitude);
    this.server.emit('locationUpdated', { id, latitude, longitude });
  }

  @SubscribeMessage('updateAvailability')
  async handleUpdateAvailability(
    @MessageBody('id') id: number,
    @MessageBody('availability') availability: boolean,
  ): Promise<void> {
    await this.driverService.updateAvailability(id, availability);
    this.server.emit('availabilityUpdated', { id, availability });
  }

  @SubscribeMessage('ping')
  async handlePing(): Promise<void> {
    this.server.emit('pong');
  }
}
