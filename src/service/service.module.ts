import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { GudangModule } from '../gudang/gudang.module';

@Module({
  imports: [GudangModule],
  providers: [ServiceService],
  controllers: [ServiceController],
})
export class ServiceModule {}
