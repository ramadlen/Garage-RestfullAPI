export class JenisPerangkatResponse {
  id: number;
  merk: string;
  nama_jenis?: string;
  nama_alat?: string;
  tahun_rilis?: string;
  mulai_digunakan?: string;
}

export class CreateJenisPerangkatRequest {
  customer_id: number;
  merk: string;
  nama_jenis?: string;
  nama_alat?: string;
  tahun_rilis?: string;
  mulai_digunakan?: string;
}

export class GetJenisPerangkatRequest {
  customer_id: number;
  jenisPerangkat_id: number;
}

export class UpdateJenisPerangkatRequest {
  id: number;
  customer_id: number;
  merk: string;
  nama_jenis?: string;
  nama_alat?: string;
  tahun_rilis?: string;
  mulai_digunakan?: string;
}

export class RemoveJenisPerangkatRequest {
  customer_id: number;
  jenisPerangkat_id: number;
}
