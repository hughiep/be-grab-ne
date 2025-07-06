/**
 * Driver Gateway
 * This module provides a WebSocket gateway for managing driver connections.
 * It allows clients to connect, disconnect, and receive updates about driver status.
 * It also handles driver-specific events such as updates and disconnections.
 */

import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(80, {
  cors: {
    origin: '*', // Adjust this to your needs
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  },
})
export class DriverGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // Handle new connections
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    // You can emit an event to the client if needed
    client.emit('connected', { message: 'Welcome to the driver gateway!' });
  }

  // Handle disconnections
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Example of a custom event handler
  @SubscribeMessage('driverUpdate')
  handleDriverUpdate(@MessageBody() data: unknown): void {
    console.log('Driver update received:', data);
    // Broadcast the update to all connected clients
    this.server.emit('driverUpdate', data);
  }
}
