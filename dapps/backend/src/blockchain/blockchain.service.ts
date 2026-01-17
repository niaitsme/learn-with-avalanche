/* eslint-disable */
import { 
  Injectable, 
  InternalServerErrorException, 
  ServiceUnavailableException 
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createPublicClient, http, PublicClient } from 'viem';
import { avalancheFuji } from 'viem/chains';
import { SIMPLE_STORAGE_ABI } from './abi';

@Injectable()
export class BlockchainService {
  public client: PublicClient;
  public contractAddress: `0x${string}`;

  constructor(private configService: ConfigService) {
    this.client = createPublicClient({
      chain: avalancheFuji,
      transport: http('https://api.avax-test.network/ext/bc/C/rpc', {
        timeout: 10_000, // 10 detik timeout
      }),
    }) as PublicClient;

    const address = this.configService.get<string>('CONTRACT_ADDRESS');
    this.contractAddress = address as `0x${string}`;
  }

  async getLatestValue() {
    try {
      const [value, block] = await Promise.all([
        this.client.readContract({
          address: this.contractAddress,
          abi: SIMPLE_STORAGE_ABI,
          functionName: 'getValue',
        }),
        this.client.getBlock(),
      ]);

      return {
        value: (value as bigint).toString(),
        blockNumber: block.number.toString(),
        updatedAt: new Date(Number(block.timestamp) * 1000).toISOString(),
      };
    } catch (error: any) {
      this.handleRpcError(error);
    }
  }

  async getValueUpdatedEvents() {
    try {
      const events = await this.client.getLogs({
        address: this.contractAddress,
        event: {
          type: 'event',
          name: 'ValueUpdated',
          inputs: [{ name: 'newValue', type: 'uint256', indexed: false }],
        },
        fromBlock: 0n,
        toBlock: 'latest',
      });

      return events.map((event: any) => ({
        blockNumber: event.blockNumber?.toString(),
        value: event.args.newValue?.toString(),
        txHash: event.transactionHash,
      }));
    } catch (error: any) {
      this.handleRpcError(error);
    }
  }

  // buat error
  private handleRpcError(error: any): never {
    const message = error?.message?.toLowerCase() || '';

    // kelamaan
    if (message.includes('timeout')) {
      throw new ServiceUnavailableException(
        'RPC timeout. Silakan coba beberapa saat lagi.',
      );
    }

    //internet mati
    if (
      message.includes('network') ||
      message.includes('fetch') ||
      message.includes('failed')
    ) {
      throw new ServiceUnavailableException(
        'Tidak dapat terhubung ke blockchain RPC.',
      );
    }

    // eror yang gak dikenal
    throw new InternalServerErrorException(
      'Terjadi kesalahan saat membaca data blockchain.',
    );
  }
}