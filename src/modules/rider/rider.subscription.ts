// subscription.service.ts

import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

export interface UserSubscription {
  socket: Socket;
  latitude: number;
  longitude: number;
  radius: number;
}

@Injectable()
export class SubscriptionService {
  private userSubscriptions: Map<string, UserSubscription> = new Map();

  addSubscription(clientId: string, subscription: UserSubscription): void {
    this.userSubscriptions.set(clientId, subscription);
  }

  removeSubscription(clientId: string): void {
    this.userSubscriptions.delete(clientId);
  }

  getSubscriptions(): IterableIterator<UserSubscription> {
    return this.userSubscriptions.values();
  }

  getRiderSocket(riderId: string): Socket | undefined {
    const subscription = this.userSubscriptions.get(riderId);
    return subscription?.socket;
  }
}
