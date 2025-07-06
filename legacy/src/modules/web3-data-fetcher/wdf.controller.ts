import { Controller, Get, Param } from '@nestjs/common';
import { WdfService } from './wdf.service';

@Controller('wdf')
export class WdfController {
  constructor(private wdfService: WdfService) {}

  @Get('block/:blockNumber')
  async fetchBlock(@Param('blockNumber') blockNumber: string) {
    return this.wdfService.fetchBlock(blockNumber);
  }

  @Get('gas-price')
  async fetchGasPrice() {
    return this.wdfService.fetchGasPrice();
  }
}
