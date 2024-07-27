import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import { GudangService } from '../gudang/gudang.service';
import { Service, User } from '@prisma/client';
import {
  CreateServiceRequest,
  GetServiceRequest,
  RemoveServiceRequest,
  ServiceResponse,
  UpdateServiceRequest,
} from '../model/service.model';
import { ServiceValidation } from './service.validation';


@Injectable()
export class ServiceService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
    private validationService: ValidationService,
    private gudangService: GudangService,
  ) {}

  async create(
    user: User,
    request: CreateServiceRequest,
  ): Promise<ServiceResponse> {
    this.logger.debug(
      `Service.create(${JSON.stringify(user)}, ${JSON.stringify(request)})`,
    );
    const createRequest: CreateServiceRequest = this.validationService.validate(
      ServiceValidation.CREATE,
      request,
    );

    await this.gudangService.checkGudangMustExists(
      user.username,
      createRequest.gudang_id,
    );

    const service = await this.prismaService.service.create({
      data: createRequest,
    });

    return this.toServiceResponse(service);
  }

  toServiceResponse(service: Service): ServiceResponse {
    return {
      id: service.id,
      keluhan: service.keluhan,
      mulai_ditangani: service.mulai_ditangani,
      alat_darigudang: service.alat_darigudang,
    };
  }

  async checkServiceMustExists(
    gudangId: number,
    serviceId: number,
  ): Promise<Service> {
    const service = await this.prismaService.service.findFirst({
      where: {
        id: serviceId,
        gudang_id: gudangId,
      },
    });

    if (!service) {
      throw new HttpException('Service is not found', 404);
    }

    return service;
  }

  async get(user: User, request: GetServiceRequest): Promise<ServiceResponse> {
    const getRequest: GetServiceRequest = this.validationService.validate(
      ServiceValidation.GET,
      request,
    );

    await this.gudangService.checkGudangMustExists(
      user.username,
      getRequest.gudang_id,
    );

    const service = await this.checkServiceMustExists(
      getRequest.gudang_id,
      getRequest.service_id,
    );

    return this.toServiceResponse(service);
  }

  async update(
    user: User,
    request: UpdateServiceRequest,
  ): Promise<ServiceResponse> {
    const updateRequest: UpdateServiceRequest = this.validationService.validate(
      ServiceValidation.UPDATE,
      request,
    );

    await this.gudangService.checkGudangMustExists(
      user.username,
      updateRequest.gudang_id,
    );

    let service = await this.checkServiceMustExists(
      updateRequest.gudang_id,
      updateRequest.id,
    );

    service = await this.prismaService.service.update({
      where: {
        id: service.id,
        gudang_id: service.gudang_id,
      },
      data: updateRequest,
    });

    return this.toServiceResponse(service);
  }

  async remove(
    user: User,
    request: RemoveServiceRequest,
  ): Promise<ServiceResponse> {
    const removeRequest: RemoveServiceRequest = this.validationService.validate(
      ServiceValidation.REMOVE,
      request,
    );

    await this.gudangService.checkGudangMustExists(
      user.username,
      removeRequest.gudang_id,
    );
    await this.checkServiceMustExists(
      removeRequest.gudang_id,
      removeRequest.service_id,
    );

    const service = await this.prismaService.service.delete({
      where: {
        id: removeRequest.service_id,
        gudang_id: removeRequest.gudang_id,
      },
    });

    return this.toServiceResponse(service);
  }

  async list(user: User, gudangId: number): Promise<ServiceResponse[]> {
    await this.gudangService.checkGudangMustExists(user.username,gudangId);
    const services = await this.prismaService.service.findMany({
      where: {
        gudang_id: gudangId,
      },
    });

    return services.map((service) => this.toServiceResponse(service));
  }
}
