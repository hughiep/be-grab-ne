// driver.service.ts

import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class DriverService {
  private driverSockets: Map<string, Socket> = new Map();

  registerDriver(driverId: string, socket: Socket): void {
    this.driverSockets.set(driverId, socket);
  }

  getDriverSocket(driverId: string): Socket | undefined {
    return this.driverSockets.get(driverId);
  }

  removeDriver(driverId: string): void {
    this.driverSockets.delete(driverId);
  }

  // Additional driver-related methods
  updateLocation(driverId: number, latitude: number, longitude: number): void {
    // Update driver's location
  }
}
