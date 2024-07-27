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
import { JenisPerangkatService } from './jenisPerangkat.service';
import {
  CreateJenisPerangkatRequest,
  GetJenisPerangkatRequest,
  JenisPerangkatResponse,
  RemoveJenisPerangkatRequest,
  UpdateJenisPerangkatRequest,
} from '../model/jenisPerangkat.model';

@Controller('/api/customers/:customerId/jenisperangkat')
export class JenisPerangkatController {
  constructor(private jenisPerangkatService: JenisPerangkatService) {}

  @Post()
  @HttpCode(200)
  async create(
    @Auth() user: User,
    @Param('customerId', ParseIntPipe) customerId: number,
    @Body() request: CreateJenisPerangkatRequest,
  ): Promise<WebResponse<JenisPerangkatResponse>> {
    request.customer_id = customerId;
    const result = await this.jenisPerangkatService.create(user, request);
    return {
      data: result,
    };
  }

  @Get('/:jenispearangkatId')
  @HttpCode(200)
  async get(
    @Auth() user: User,
    @Param('customerId', ParseIntPipe) customerId: number,
    @Param('jenisperangkatId', ParseIntPipe) jenisperangkatId: number,
  ): Promise<WebResponse<JenisPerangkatResponse>> {
    const request: GetJenisPerangkatRequest = {
      jenisPerangkat_id: jenisperangkatId,
      customer_id: customerId,
    };
    const result = await this.jenisPerangkatService.get(user, request);
    return {
      data: result,
    };
  }

  @Put('/:jenisperangkatId')
  @HttpCode(200)
  async update(
    @Auth() user: User,
    @Param('customerId', ParseIntPipe) customerId: number,
    @Param('jenisperangkatId', ParseIntPipe) jenisperangkatId: number,
    @Body() request: UpdateJenisPerangkatRequest,
  ): Promise<WebResponse<JenisPerangkatResponse>> {
    request.customer_id = customerId;
    request.id = jenisperangkatId;
    const result = await this.jenisPerangkatService.update(user, request);
    return {
      data: result,
    };
  }

  @Delete('/:jenisperangkatId')
  @HttpCode(200)
  async remove(
    @Auth() user: User,
    @Param('customerId', ParseIntPipe) customerId: number,
    @Param('jenisperangkatId', ParseIntPipe) jenisperangkatId: number,
  ): Promise<WebResponse<boolean>> {
    const request: RemoveJenisPerangkatRequest = {
      jenisPerangkat_id: jenisperangkatId,
      customer_id: customerId,
    };
    await this.jenisPerangkatService.remove(user, request);
    return {
      data: true,
    };
  }

  @Get()
  @HttpCode(200)
  async list(
    @Auth() user: User,
    @Param('customerId', ParseIntPipe) customerId: number,
  ): Promise<WebResponse<JenisPerangkatResponse[]>> {
    const result = await this.jenisPerangkatService.list(user, customerId);
    return {
      data: result,
    };
  }
}
