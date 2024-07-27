import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from '../common/prisma.service';
import { Gudang, User } from '@prisma/client';
import { ValidationService } from '../common/validation.service';
import { WebResponse } from '../model/web.model';
import {
  CreateGudangRequest,
  GudangResponse,
  SearchGudangRequest,
  UpdateGudangRequest,
} from '../model/gudang.model';
import { GudangValidation } from './gudang.validation';

@Injectable()
export class GudangService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
    private validationService: ValidationService,
  ) {}

  async create(
    user: User,
    request: CreateGudangRequest,
  ): Promise<GudangResponse> {
    this.logger.debug(
      `GudangService.create(${JSON.stringify(user)}, ${JSON.stringify(request)})`,
    );
    const createRequest: CreateGudangRequest = this.validationService.validate(
      GudangValidation.CREATE,
      request,
    );

    const gudang = await this.prismaService.gudang.create({
      data: {
        ...createRequest,
        ...{ karyawan: user.username },
      },
    });

    return this.toGudangResponse(gudang);
  }

  toGudangResponse(gudang: Gudang): GudangResponse {
    return {
      id: gudang.id,
      sparepart_masuk: gudang.sparepart_masuk,
      Jumlah: gudang.Jumlah,
      merk: gudang.merk,
      nama_sparepart: gudang.nama_sparepart,
      nama_jenis: gudang.nama_jenis,
      tahun_rilis: gudang.tahun_rilis,
    };
  }

  async checkGudangMustExists(
    username: string,
    gudangId: number,
  ): Promise<Gudang> {
    const gudang = await this.prismaService.gudang.findFirst({
      where: {
        karyawan: username,
        id: gudangId,
      },
    });

    if (!gudang) {
      throw new HttpException('Gudang is not found', 404);
    }

    return gudang;
  }

  async get(user: User, gudangId: number): Promise<GudangResponse> {
    const gudang = await this.checkGudangMustExists(user.username, gudangId);
    return this.toGudangResponse(gudang);
  }

  async update(
    user: User,
    request: UpdateGudangRequest,
  ): Promise<GudangResponse> {
    const updateRequest = this.validationService.validate(
      GudangValidation.UPDATE,
      request,
    );
    let gudang = await this.checkGudangMustExists(
      user.username,
      updateRequest.id,
    );

    gudang = await this.prismaService.gudang.update({
      where: {
        id: gudang.id,
        karyawan: gudang.karyawan,
      },
      data: updateRequest,
    });

    return this.toGudangResponse(gudang);
  }

  async remove(user: User, gudangId: number): Promise<GudangResponse> {
    await this.checkGudangMustExists(user.username, gudangId);

    const gudang = await this.prismaService.gudang.delete({
      where: {
        id: gudangId,
        karyawan: user.username,
      },
    });

    return this.toGudangResponse(gudang);
  }

  async search(
    user: User,
    request: SearchGudangRequest,
  ): Promise<WebResponse<GudangResponse[]>> {
    const searchRequest: SearchGudangRequest = this.validationService.validate(
      GudangValidation.SEARCH,
      request,
    );

    const filters = [];

    if (searchRequest.name) {
      // add name filter
      filters.push({
        OR: [
          {
            first_name: {
              contains: searchRequest.name,
            },
          },
          {
            last_name: {
              contains: searchRequest.name,
            },
          },
        ],
      });
    }

    if (searchRequest.nama_sparepart) {
      // add email filter
      filters.push({
        email: {
          contains: searchRequest.nama_sparepart,
        },
      });
    }

    if (searchRequest.merk) {
      // add phone filter
      filters.push({
        phone: {
          contains: searchRequest.merk,
        },
      });
    }

    const skip = (searchRequest.page - 1) * searchRequest.size;

    const gudangs = await this.prismaService.gudang.findMany({
      where: {
        karyawan: user.username,
        AND: filters,
      },
      take: searchRequest.size,
      skip: skip,
    });

    const total = await this.prismaService.gudang.count({
      where: {
        karyawan: user.username,
        AND: filters,
      },
    });

    return {
      data: gudangs.map((gudang) => this.toGudangResponse(gudang)),
      paging: {
        current_page: searchRequest.page,
        size: searchRequest.size,
        total_page: Math.ceil(total / searchRequest.size),
      },
    };
  }
}
