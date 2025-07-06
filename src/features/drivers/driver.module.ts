import { DriverGateway } from '@features/drivers/driver.gateway';
import { Module } from '@nestjs/common';

@Module({
  providers: [DriverGateway],
  exports: [DriverGateway], // Export if other modules need to use it
})
export class DriverModule {}
