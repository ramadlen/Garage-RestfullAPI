import { z, ZodType } from 'zod';

export class GudangValidation {
  static readonly CREATE: ZodType = z.object({
    sparepart_masuk: z.string().min(1).max(100),
    Jumlah: z.string().min(1).max(100),
    merk: z.string().min(1).max(100),
    nama_sparepart: z.string().min(1).max(100),
    nama_jenis: z.string().min(1).max(100).optional(),
    tahun_rilis: z.string().min(1).max(100).optional(),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    sparepart_masuk: z.string().min(1).max(100),
    Jumlah: z.string().min(1).max(100),
    merk: z.string().min(1).max(100),
    nama_sparepart: z.string().min(1).max(100),
    nama_jenis: z.string().min(1).max(100).optional(),
    tahun_rilis: z.string().min(1).max(100).optional(),
  });

  static readonly SEARCH: ZodType = z.object({
    name: z.string().min(1).optional(),
    nama_sparepart: z.string().min(1).optional(),
    merk: z.string().min(1).optional(),
    page: z.number().min(1).positive(),
    size: z.number().min(1).max(100).positive(),
  });
}
