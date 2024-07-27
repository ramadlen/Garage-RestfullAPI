export class ServiceResponse {
  id: number;
  keluhan: string;
  mulai_ditangani?: string;
  alat_darigudang: string;
}

export class CreateServiceRequest {
  gudang_id: number;
  keluhan: string;
  mulai_ditangani?: string;
  alat_darigudang: string;
}

export class GetServiceRequest {
  gudang_id: number;
  service_id: number;
}

export class UpdateServiceRequest {
  id: number;
  gudang_id: number;
  keluhan: string;
  mulai_ditangani?: string;
  alat_darigudang: string;
}

export class RemoveServiceRequest {
  gudang_id: number;
  service_id: number;
}
