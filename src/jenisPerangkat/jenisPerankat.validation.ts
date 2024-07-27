import { z, ZodType } from 'zod';

export class JenisPerangkatValidation {
  static readonly CREATE: ZodType = z.object({
    customer_id: z.number().min(1).positive(),
    merk: z.string().min(1).max(255).optional(),
    nama_jenis: z.string().min(1).max(100).optional(),
    nama_alat: z.string().min(1).max(100).optional(),
    tahun_rilis: z.string().min(1).max(100).optional(),
    mulai_digunakan: z.string().min(1).max(100).optional(),
  });

  static readonly GET: ZodType = z.object({
    customer_id: z.number().min(1).positive(),
    jenisPerangkat_id: z.number().min(1).positive(),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number().min(1).positive(),
    customer_id: z.number().min(1).positive(),
    merk: z.string().min(1).max(255).optional(),
    nama_jenis: z.string().min(1).max(100).optional(),
    nama_alat: z.string().min(1).max(100).optional(),
    tahun_rilis: z.string().min(1).max(100).optional(),
    mulai_digunakan: z.string().min(1).max(100).optional(),
  });

  static readonly REMOVE: ZodType = z.object({
    customer_id: z.number().min(1).positive(),
    jenisPerangkat_id: z.number().min(1).positive(),
  });
}
