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
} from '@nestjs/common';
import { WebResponse } from '../model/web.model';

import { User } from '@prisma/client';
import { Auth } from '../common/auth.decorator';
import { ServiceService } from './service.service';
import { CreateServiceRequest, GetServiceRequest, RemoveServiceRequest, ServiceResponse, UpdateServiceRequest } from 'src/model/service.model';

@Controller('/api/gudangs/:gudangId/services')
export class ServiceController {
  constructor(private serviceService: ServiceService) {}

  @Post()
  @HttpCode(200)
  async create(
    @Auth() user: User,
    @Param('gudangId', ParseIntPipe) gudangId: number,
    @Body() request: CreateServiceRequest,
  ): Promise<WebResponse<ServiceResponse>> {
    request.gudang_id = gudangId;
    const result = await this.serviceService.create(user, request);
    return {
      data: result,
    };
  }

  @Get('/:serviceId')
  @HttpCode(200)
  async get(
    @Auth() user: User,
    @Param('gudangId', ParseIntPipe) gudangId: number,
    @Param('serviceId', ParseIntPipe) serviceId: number,
  ): Promise<WebResponse<ServiceResponse>> {
    const request: GetServiceRequest = {
     service_id: serviceId,
     gudang_id: gudangId,
    };
    const result = await this.serviceService.get(user, request);
    return {
      data: result,
    };
  }

  @Put('/:serviceId')
  @HttpCode(200)
  async update(
    @Auth() user: User,
    @Param('gudangId', ParseIntPipe) gudangId: number,
    @Param('serviceId', ParseIntPipe) serviceId: number,
    @Body() request: UpdateServiceRequest,
  ): Promise<WebResponse<ServiceResponse>> {
    request.gudang_id = gudangId;
    request.id = serviceId;
    const result = await this.serviceService.update(user, request);
    return {
      data: result,
    };
  }

  @Delete('/:serviceId')
  @HttpCode(200)
  async remove(
    @Auth() user: User,
    @Param('gudangId', ParseIntPipe) gudangId: number,
    @Param('serviceId', ParseIntPipe) serviceId: number,
  ): Promise<WebResponse<boolean>> {
    const request: RemoveServiceRequest = {
      service_id: serviceId,
      gudang_id: gudangId,
    };
    await this.serviceService.remove(user, request);
    return {
      data: true,
    };
  }

  @Get()
  @HttpCode(200)
  async list(
    @Auth() user: User,
    @Param('gudangId', ParseIntPipe) gudangId: number,
  ): Promise<WebResponse<ServiceResponse[]>> {
    const result = await this.serviceService.list(user, gudangId);
    return {
      data: result,
    };
  }
}
