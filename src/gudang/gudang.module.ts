import { Module } from '@nestjs/common';
import { GudangService } from './gudang.service';
import { GudangController } from './gudang.controller';

@Module({
  providers: [GudangService],
  exports: [GudangService],
  controllers: [GudangController],
})
export class GudangModule {}
