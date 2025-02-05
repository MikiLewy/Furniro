import { InferResultType } from '@/types/infer-db-result-type';

export type Review = InferResultType<'reviews'>;

export type ReviewWithUser = InferResultType<'reviews', { user: true }>;
