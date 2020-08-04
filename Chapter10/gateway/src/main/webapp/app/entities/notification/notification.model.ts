import { BaseEntity } from './../../shared';

export const enum NotificationType {
    'EMAIL',
    'SMS',
    'PARCEL'
}

export class Notification implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public details?: string,
        public sentDate?: any,
        public format?: NotificationType,
        public userId?: number,
        public productId?: number,
    ) {
    }
}
