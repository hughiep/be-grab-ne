import { Injectable } from '@nestjs/common';
import { createPublicClient, http } from 'viem';
import { polygonAmoy } from 'viem/chains';

@Injectable()
export class WdfService {
  private readonly web3Client;

  constructor() {
    const client = createPublicClient({
      chain: polygonAmoy,
      transport: http(),
    });

    this.web3Client = client;
  }

  // Add a method to fetch data from the blockchain
  async fetchBlock(blockNumber: string) {
    return this.web3Client.getBlock({ blockNumber: BigInt(blockNumber) });
  }

  async fetchGasPrice() {
    return this.web3Client.getGasPrice();
  }
}
