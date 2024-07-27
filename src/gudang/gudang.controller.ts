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
import { GudangService } from './gudang.service';
import {
  CreateGudangRequest,
  GudangResponse,
  SearchGudangRequest,
  UpdateGudangRequest,
} from 'src/model/gudang.model';

@Controller('/api/gudangs')
export class GudangController {
  constructor(private gudangService: GudangService) {}

  @Post()
  @HttpCode(200)
  async create(
    @Auth() user: User,
    @Body() request: CreateGudangRequest,
  ): Promise<WebResponse<GudangResponse>> {
    const result = await this.gudangService.create(user, request);
    return {
      data: result,
    };
  }

  @Get('/:gudangId')
  @HttpCode(200)
  async get(
    @Auth() user: User,
    @Param('gudangId', ParseIntPipe) gudangId: number,
  ): Promise<WebResponse<GudangResponse>> {
    const result = await this.gudangService.get(user, gudangId);
    return {
      data: result,
    };
  }

  @Put('/:gudangId')
  @HttpCode(200)
  async update(
    @Auth() user: User,
    @Param('gudangId', ParseIntPipe) gudangId: number,
    @Body() request: UpdateGudangRequest,
  ): Promise<WebResponse<GudangResponse>> {
    request.id = gudangId;
    const result = await this.gudangService.update(user, request);
    return {
      data: result,
    };
  }

  @Delete('/:gudangId')
  @HttpCode(200)
  async remove(
    @Auth() user: User,
    @Param('gudangId', ParseIntPipe) gudangId: number,
  ): Promise<WebResponse<boolean>> {
    await this.gudangService.remove(user, gudangId);
    return {
      data: true,
    };
  }

  @Get()
  @HttpCode(200)
  async search(
    @Auth() user: User,
    @Query('name') name?: string,
    @Query('nama_sparepart') nama_sparepart?: string,
    @Query('merk') merk?: string,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('size', new ParseIntPipe({ optional: true })) size?: number,
  ): Promise<WebResponse<GudangResponse[]>> {
    const request: SearchGudangRequest = {
      name: name,
      nama_sparepart: nama_sparepart,
      merk: merk,
      page: page || 1,
      size: size || 10,
    };
    return this.gudangService.search(user, request);
  }
}
