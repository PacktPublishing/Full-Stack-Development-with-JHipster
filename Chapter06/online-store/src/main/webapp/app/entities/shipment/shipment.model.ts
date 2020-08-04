import { BaseEntity } from './../../shared';

export class Shipment implements BaseEntity {
    constructor(
        public id?: number,
        public trackingCode?: string,
        public date?: any,
        public details?: string,
        public invoice?: BaseEntity,
    ) {
    }
}
