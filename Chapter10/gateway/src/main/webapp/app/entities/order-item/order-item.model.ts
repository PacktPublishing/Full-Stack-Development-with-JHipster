import { BaseEntity } from './../../shared';

export const enum OrderItemStatus {
    'AVAILABLE',
    'OUT_OF_STOCK',
    'BACK_ORDER'
}

export class OrderItem implements BaseEntity {
    constructor(
        public id?: number,
        public quantity?: number,
        public totalPrice?: number,
        public status?: OrderItemStatus,
        public product?: BaseEntity,
        public order?: BaseEntity,
    ) {
    }
}
