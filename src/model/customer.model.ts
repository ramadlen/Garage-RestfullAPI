// // import { ApiProperty } from '@nestjs/swagger';

// export class CreateCustomerRequest {
//   //   @ApiProperty()
//   first_name: string;
//   //   @ApiProperty()
//   last_name?: string;
//   //   @ApiProperty()
//   email?: string;
//   //   @ApiProperty()
//   phone?: string;
//   //   @ApiProperty()
//   panggilan: string;
//   //   @ApiProperty()
//   tanggallahir: string;
//   //   @ApiProperty()
//   alamat: string;
//   //   @ApiProperty()
//   kota: string;
//   //   @ApiProperty()
//   createdAt: Date;
//   //   @ApiProperty()
//   updatedAt: Date;
// }

// export class CustomerResponse {
//   //   @ApiProperty()
//   id: number;
//   //   @ApiProperty()
//   first_name: string;
//   //   @ApiProperty()
//   last_name?: string;
//   //   @ApiProperty()
//   email?: string;
//   //   @ApiProperty()
//   phone?: string;
//   //   @ApiProperty()
//   panggilan: string;
//   //   @ApiProperty()
//   tanggallahir: string;
//   //   @ApiProperty()
//   alamat: string;
//   //   @ApiProperty()
//   kota: string;
//   //   @ApiProperty()
//   createdAt: Date;
//   //   @ApiProperty()
//   updatedAt: Date;
// }

// export class UpdateCustomerRequest {
//   //   @ApiProperty()
//   id: number;
//   //   @ApiProperty()
//   first_name: string;
//   //   @ApiProperty()
//   last_name?: string;
//   //   @ApiProperty()
//   email?: string;
//   //   @ApiProperty()
//   phone?: string;
//   //   @ApiProperty()
//   panggilan: string;
//   //   @ApiProperty()
//   tanggallahir: string;
//   //   @ApiProperty()
//   alamat: string;
//   //   @ApiProperty()
//   kota: string;
//   //   @ApiProperty()
//   createdAt: Date;
//   //   @ApiProperty()
//   updatedAt: Date;
// }

// export class SearchCustomerRequest {
//   name: string;
//   email?: string;
//   phone?: string;
//   page: number;
//   size: number;
// }

export class CustomerResponse {
  id: number;
  first_name: string;
  last_name?: string;
  email?: string;
  phone?: string;
  panggilan: string;
  tanggallahir: string;
  alamat: string;
  kota: string;
}

export class CreateCustomerRequest {
  first_name: string;
  last_name?: string;
  email?: string;
  phone?: string;
  panggilan: string;
  tanggallahir: string;
  alamat: string;
  kota: string;
}

export class UpdateCustomerRequest {
  id: number;
  first_name: string;
  last_name?: string;
  email?: string;
  phone?: string;
  panggilan: string;
  tanggallahir: string;
  alamat: string;
  kota: string;
}

export class SearchCustomerRequest {
  name?: string;
  email?: string;
  phone?: string;
  page: number;
  size: number;
}
