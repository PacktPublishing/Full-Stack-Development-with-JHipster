import { BaseEntity } from './../../shared';

export const enum Size {
    'S',
    'M',
    'L',
    'XL',
    'XXL'
}

export class Product implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public imageContentType?: string,
        public image?: any,
        public price?: number,
        public size?: Size,
        public productCategory?: BaseEntity,
    ) {
    }
}
