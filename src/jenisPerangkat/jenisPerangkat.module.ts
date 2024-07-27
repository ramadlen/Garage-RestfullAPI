import { Module } from '@nestjs/common';
import { JenisPerangkatService } from './jenisPerangkat.service';
import { JenisPerangkatController } from './jenisPerangkat.controller';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [CustomerModule],
  providers: [JenisPerangkatService],
  controllers: [JenisPerangkatController],
})
export class JenisPerangkatModule {}
