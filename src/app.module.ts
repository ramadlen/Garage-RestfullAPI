import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { ContactModule } from './contact/contact.module';
import { AddressModule } from './address/address.module';
import { CustomerModule } from './customer/customer.module';
import { JenisPerangkatModule } from './jenisPerangkat/jenisPerangkat.module';
import { GudangModule } from './gudang/gudang.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [
    CommonModule,
    UserModule,
    ContactModule,
    AddressModule,
    CustomerModule,
    JenisPerangkatModule,
    GudangModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 30,
      },
    ]),
    ServiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
