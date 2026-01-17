import { Controller, Get } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetEventsDto } from './blockchain.dto';

@ApiTags('blockchain')
@Controller('blockchain')
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Get('value')
  @ApiOperation({})
  async getValue() {
    return this.blockchainService.getLatestValue();
  }

  @Get('events')
  @ApiOperation({})
  @ApiResponse({
    status: 200,
    description: 'List riwayat event',
    type: [GetEventsDto],
  })
  async getEvents() {
    return this.blockchainService.getValueUpdatedEvents();
  }
}
