import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { Auth } from '../common/auth.decorator';
import { User } from '@prisma/client';

import { WebResponse } from '../model/web.model';
import { CustomerService } from './customer.service';
import {
  CreateCustomerRequest,
  CustomerResponse,
  SearchCustomerRequest,
  UpdateCustomerRequest,
} from 'src/model/customer.model';

@Controller('/api/customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post()
  @HttpCode(200)
  async create(
    @Auth() user: User,
    @Body() request: CreateCustomerRequest,
  ): Promise<WebResponse<CustomerResponse>> {
    const result = await this.customerService.create(user, request);
    return {
      data: result,
    };
  }

  @Get('/:customerId')
  @HttpCode(200)
  async get(
    @Auth() user: User,
    @Param('customerId', ParseIntPipe) customerId: number,
  ): Promise<WebResponse<CustomerResponse>> {
    const result = await this.customerService.get(user, customerId);
    return {
      data: result,
    };
  }

  @Put('/:customerId')
  @HttpCode(200)
  async update(
    @Auth() user: User,
    @Param('customerId', ParseIntPipe) customerId: number,
    @Body() request: UpdateCustomerRequest,
  ): Promise<WebResponse<CustomerResponse>> {
    request.id = customerId;
    const result = await this.customerService.update(user, request);
    return {
      data: result,
    };
  }

  @Delete('/:customerId')
  @HttpCode(200)
  async remove(
    @Auth() user: User,
    @Param('customerId', ParseIntPipe) customerId: number,
  ): Promise<WebResponse<boolean>> {
    await this.customerService.remove(user, customerId);
    return {
      data: true,
    };
  }

  @Get()
  @HttpCode(200)
  async search(
    @Auth() user: User,
    @Query('name') name?: string,
    @Query('email') email?: string,
    @Query('phone') phone?: string,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('size', new ParseIntPipe({ optional: true })) size?: number,
  ): Promise<WebResponse<CustomerResponse[]>> {
    const request: SearchCustomerRequest = {
      name: name,
      email: email,
      phone: phone,
      page: page || 1,
      size: size || 10,
    };
    return this.customerService.search(user, request);
  }
}
