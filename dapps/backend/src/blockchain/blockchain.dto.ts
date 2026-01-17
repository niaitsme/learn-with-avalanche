import { ApiProperty } from '@nestjs/swagger';

export class GetEventsDto {
  @ApiProperty({ example: '123456', description: 'Nomor Block' })
  blockNumber: string;

  @ApiProperty({ example: '77', description: 'Nilai yang tersimpan' })
  value: string;

  @ApiProperty({ example: '0x123abc...', description: 'Hash Transaksi' })
  txHash: string;
}
