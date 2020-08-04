import { BaseEntity } from './../../shared';

export const enum OrderStatus {
    'COMPLETED',
    'PENDING',
    'CANCELLED'
}

export class ProductOrder implements BaseEntity {
    constructor(
        public id?: number,
        public placedDate?: any,
        public status?: OrderStatus,
        public code?: string,
        public orderItems?: BaseEntity[],
        public invoices?: BaseEntity[],
        public customer?: BaseEntity,
    ) {
    }
}
