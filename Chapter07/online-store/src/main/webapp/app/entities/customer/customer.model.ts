import { BaseEntity, User } from './../../shared';

export const enum Gender {
    'MALE',
    'FEMALE',
    'OTHER'
}

export class Customer implements BaseEntity {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public gender?: Gender,
        public email?: string,
        public phone?: string,
        public addressLine1?: string,
        public addressLine2?: string,
        public city?: string,
        public country?: string,
        public user?: User,
        public orders?: BaseEntity[],
    ) {
    }
}
