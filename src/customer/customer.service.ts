import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { PrismaService } from '../common/prisma.service';
import { Contact, CustomerMasuk, User } from '@prisma/client';

import { ValidationService } from '../common/validation.service';
import { CustomerValidation } from './customer.validation';
import { WebResponse } from '../model/web.model';
import {
  CreateCustomerRequest,
  CustomerResponse,
  SearchCustomerRequest,
  UpdateCustomerRequest,
} from '../model/customer.model';

@Injectable()
export class CustomerService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
    private validationService: ValidationService,
  ) {}

  async create(
    user: User,
    request: CreateCustomerRequest,
  ): Promise<CustomerResponse> {
    this.logger.debug(
      `ContactService.create(${JSON.stringify(user)}, ${JSON.stringify(request)})`,
    );
    const createRequest: CreateCustomerRequest =
      this.validationService.validate(CustomerValidation.CREATE, request);

    const customer = await this.prismaService.customerMasuk.create({
      data: {
        ...createRequest,
        ...{ username_yangmasukin: user.username },
      },
    });

    return this.toCustomerResponse(customer);
  }

  toCustomerResponse(customer: CustomerMasuk): CustomerResponse {
    return {
      first_name: customer.first_name,
      last_name: customer.last_name,
      email: customer.email,
      phone: customer.phone,
      id: customer.id,
      panggilan: customer.panggilan,
      tanggallahir: customer.tanggallahir,
      alamat: customer.alamat,
      kota: customer.kota,
    };
  }

  async checkCustomerMustExists(
    username: string,
    customerId: number,
  ): Promise<CustomerMasuk> {
    const customer = await this.prismaService.customerMasuk.findFirst({
      where: {
        username_yangmasukin: username,
        id: customerId,
      },
    });

    if (!customer) {
      throw new HttpException('Customer is not found', 404);
    }

    return customer;
  }

  async get(user: User, customerId: number): Promise<CustomerResponse> {
    const customer = await this.checkCustomerMustExists(
      user.username,
      customerId,
    );
    return this.toCustomerResponse(customer);
  }

  async update(
    user: User,
    request: UpdateCustomerRequest,
  ): Promise<CustomerResponse> {
    const updateRequest = this.validationService.validate(
      CustomerValidation.UPDATE,
      request,
    );
    let customer = await this.checkCustomerMustExists(
      user.username,
      updateRequest.id,
    );

    customer = await this.prismaService.customerMasuk.update({
      where: {
        id: customer.id,
        username_yangmasukin: customer.username_yangmasukin,
      },
      data: updateRequest,
    });

    return this.toCustomerResponse(customer);
  }

  async remove(user: User, customerId: number): Promise<CustomerResponse> {
    await this.checkCustomerMustExists(user.username, customerId);

    const customer = await this.prismaService.customerMasuk.delete({
      where: {
        id: customerId,
        username_yangmasukin: user.username,
      },
    });

    return this.toCustomerResponse(customer);
  }

  async search(
    user: User,
    request: SearchCustomerRequest,
  ): Promise<WebResponse<CustomerResponse[]>> {
    const searchRequest: SearchCustomerRequest =
      this.validationService.validate(CustomerValidation.SEARCH, request);

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

    if (searchRequest.email) {
      // add email filter
      filters.push({
        email: {
          contains: searchRequest.email,
        },
      });
    }

    if (searchRequest.phone) {
      // add phone filter
      filters.push({
        phone: {
          contains: searchRequest.phone,
        },
      });
    }

    const skip = (searchRequest.page - 1) * searchRequest.size;

    const customer = await this.prismaService.customerMasuk.findMany({
      where: {
        username_yangmasukin: user.username,
        AND: filters,
      },
      take: searchRequest.size,
      skip: skip,
    });

    const total = await this.prismaService.customerMasuk.count({
      where: {
        username_yangmasukin: user.username,
        AND: filters,
      },
    });

    return {
      data: customer.map((customer) => this.toCustomerResponse(customer)),
      paging: {
        current_page: searchRequest.page,
        size: searchRequest.size,
        total_page: Math.ceil(total / searchRequest.size),
      },
    };
  }
}
