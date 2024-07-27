import { z, ZodType } from 'zod';

export class ServiceValidation {
  static readonly CREATE: ZodType = z.object({
    gudang_id: z.number().min(1).positive(),
    keluhan: z.string().min(1).max(255),
    mulai_ditangani: z.string().min(1).max(100).optional(),
    alat_darigudang: z.string().min(1).max(255),
  });

  static readonly GET: ZodType = z.object({
    gudang_id: z.number().min(1).positive(),
    service_id: z.number().min(1).positive(),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number().min(1).positive(),
    gudang_id: z.number().min(1).positive(),
    keluhan: z.string().min(1).max(255),
    mulai_ditangani: z.string().min(1).max(100).optional(),
    alat_darigudang: z.string().min(1).max(255),
  });

  static readonly REMOVE: ZodType = z.object({
    gudang_id: z.number().min(1).positive(),
    service_id: z.number().min(1).positive(),
  });
}
