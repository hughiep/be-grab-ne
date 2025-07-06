// trip.service.ts

import { Injectable } from '@nestjs/common';
import { LocationService } from '../location/location.service';
import { DriverService } from '../driver/driver.service';

export interface Trip {
  tripId: string;
  riderId: string;
  driverId: string;
  pickupLat: number;
  pickupLng: number;
  destinationLat: number;
  destinationLng: number;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
}

@Injectable()
export class TripService {
  private trips: Map<string, Trip> = new Map();

  constructor(
    private readonly locationService: LocationService,
    private readonly driverService: DriverService,
  ) {}

  async createTrip(
    riderId: string,
    pickupLat: number,
    pickupLng: number,
    destinationLat: number,
    destinationLng: number,
  ): Promise<Trip | null> {
    // Find nearby drivers
    const nearbyDrivers = await this.locationService.findNearbyDrivers(
      pickupLat,
      pickupLng,
      5, // radius in km
    );

    if (nearbyDrivers.length === 0) {
      return null; // No drivers available
    }

    const driverId = nearbyDrivers[0] as any; // Select the closest driver
    const tripId = `trip_${Date.now()}`;

    const trip: Trip = {
      tripId,
      riderId,
      driverId,
      pickupLat,
      pickupLng,
      destinationLat,
      destinationLng,
      status: 'pending',
    };

    this.trips.set(tripId, trip);

    // Notify the driver about the trip request
    const driverSocket = this.driverService.getDriverSocket(driverId);
    if (driverSocket) {
      driverSocket.emit('tripRequest', trip);
    }

    return trip;
  }

  acceptTrip(tripId: string, driverId: string): boolean {
    const trip = this.trips.get(tripId);
    if (trip && trip.driverId === driverId && trip.status === 'pending') {
      trip.status = 'accepted';
      this.trips.set(tripId, trip);
      return true;
    }
    return false;
  }

  completeTrip(tripId: string): void {
    const trip = this.trips.get(tripId);
    if (trip) {
      trip.status = 'completed';
      this.trips.set(tripId, trip);
    }
  }

  // Additional methods like cancelTrip can be added similarly
  getTrip(tripId: string): Trip | null {
    return this.trips.get(tripId) || null;
  }
}
