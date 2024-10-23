import { Module } from '@nestjs/common';
import { WdfService } from './wdf.service';
import { WdfController } from './wdf.controller';

@Module({
  imports: [],
  controllers: [WdfController],
  providers: [WdfService],
})
export class WdfModule {}
