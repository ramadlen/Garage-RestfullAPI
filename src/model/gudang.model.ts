export class GudangResponse {
  id: number;
  sparepart_masuk: string;
  Jumlah: string;
  merk: string;
  nama_sparepart: string;
  nama_jenis?: string;
  tahun_rilis?: string;
}

export class CreateGudangRequest {
  sparepart_masuk: string;
  Jumlah: string;
  merk: string;
  nama_sparepart: string;
  nama_jenis?: string;
  tahun_rilis?: string;
}

export class UpdateGudangRequest {
  id: number;
  sparepart_masuk: string;
  Jumlah: string;
  merk: string;
  nama_sparepart: string;
  nama_jenis?: string;
  tahun_rilis?: string;
}

export class SearchGudangRequest {
  name?: string;
  nama_sparepart?: string;
  merk?: string;
  page: number;
  size: number;
}
