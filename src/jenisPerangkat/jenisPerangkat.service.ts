import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import { JenisPerangkat, User } from '@prisma/client';
import { CustomerService } from '../customer/customer.service';
import {
  CreateJenisPerangkatRequest,
  GetJenisPerangkatRequest,
  JenisPerangkatResponse,
  RemoveJenisPerangkatRequest,
  UpdateJenisPerangkatRequest,
} from '../model/jenisPerangkat.model';
import { JenisPerangkatValidation } from './jenisPerankat.validation';

@Injectable()
export class JenisPerangkatService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
    private validationService: ValidationService,
    private customerService: CustomerService,
  ) {}

  async create(
    user: User,
    request: CreateJenisPerangkatRequest,
  ): Promise<JenisPerangkatResponse> {
    this.logger.debug(
      `JenisPerangkatService.create(${JSON.stringify(user)}, ${JSON.stringify(request)})`,
    );
    const createRequest: CreateJenisPerangkatRequest =
      this.validationService.validate(JenisPerangkatValidation.CREATE, request);

    await this.customerService.checkCustomerMustExists(
      user.username,
      createRequest.customer_id,
    );

    const jenisPerangkat = await this.prismaService.jenisPerangkat.create({
      data: createRequest,
    });

    return this.toJenisPerangkatResponse(jenisPerangkat);
  }

  toJenisPerangkatResponse(
    jenisPerangkat: JenisPerangkat,
  ): JenisPerangkatResponse {
    return {
      id: jenisPerangkat.id,
      merk: jenisPerangkat.merk,
      nama_jenis: jenisPerangkat.nama_jenis,
      nama_alat: jenisPerangkat.nama_alat,
      tahun_rilis: jenisPerangkat.tahun_rilis,
      mulai_digunakan: jenisPerangkat.mulai_digunakan,
    };
  }

  async checkJenisPerangkatMustExists(
    customerId: number,
    jenisPerangkatId: number,
  ): Promise<JenisPerangkat> {
    const jenisPerangkat = await this.prismaService.jenisPerangkat.findFirst({
      where: {
        id: jenisPerangkatId,
        customer_id: customerId,
      },
    });

    if (!jenisPerangkat) {
      throw new HttpException('JenisPerangkat is not found', 404);
    }

    return jenisPerangkat;
  }

  async get(
    user: User,
    request: GetJenisPerangkatRequest,
  ): Promise<JenisPerangkatResponse> {
    const getRequest: GetJenisPerangkatRequest =
      this.validationService.validate(JenisPerangkatValidation.GET, request);

    await this.customerService.checkCustomerMustExists(
      user.username,
      getRequest.customer_id,
    );

    const jenisPerangkat = await this.checkJenisPerangkatMustExists(
      getRequest.customer_id,
      getRequest.jenisPerangkat_id,
    );

    return this.toJenisPerangkatResponse(jenisPerangkat);
  }

  async update(
    user: User,
    request: UpdateJenisPerangkatRequest,
  ): Promise<JenisPerangkatResponse> {
    const updateRequest: UpdateJenisPerangkatRequest =
      this.validationService.validate(JenisPerangkatValidation.UPDATE, request);

    await this.customerService.checkCustomerMustExists(
      user.username,
      updateRequest.customer_id,
    );

    let jenisPerangkat = await this.checkJenisPerangkatMustExists(
      updateRequest.customer_id,
      updateRequest.id,
    );

    jenisPerangkat = await this.prismaService.jenisPerangkat.update({
      where: {
        id: jenisPerangkat.id,
        customer_id: jenisPerangkat.customer_id,
      },
      data: updateRequest,
    });

    return this.toJenisPerangkatResponse(jenisPerangkat);
  }

  async remove(
    user: User,
    request: RemoveJenisPerangkatRequest,
  ): Promise<JenisPerangkatResponse> {
    const removeRequest: RemoveJenisPerangkatRequest =
      this.validationService.validate(JenisPerangkatValidation.REMOVE, request);

    await this.customerService.checkCustomerMustExists(
      user.username,
      removeRequest.customer_id,
    );
    await this.checkJenisPerangkatMustExists(
      removeRequest.customer_id,
      removeRequest.jenisPerangkat_id,
    );

    const jenisPerangkat = await this.prismaService.jenisPerangkat.delete({
      where: {
        id: removeRequest.jenisPerangkat_id,
        customer_id: removeRequest.customer_id,
      },
    });

    return this.toJenisPerangkatResponse(jenisPerangkat);
  }

  async list(
    user: User,
    customerId: number,
  ): Promise<JenisPerangkatResponse[]> {
    await this.customerService.checkCustomerMustExists(
      user.username,
      customerId,
    );
    const jenisPerangkats = await this.prismaService.jenisPerangkat.findMany({
      where: {
        customer_id: customerId,
      },
    });

    return jenisPerangkats.map((jenisPerangkat) =>
      this.toJenisPerangkatResponse(jenisPerangkat),
    );
  }
}
