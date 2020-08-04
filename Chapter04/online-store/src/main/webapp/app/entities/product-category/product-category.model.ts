import { BaseEntity } from './../../shared';

export class ProductCategory implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public products?: BaseEntity[],
    ) {
    }
}
