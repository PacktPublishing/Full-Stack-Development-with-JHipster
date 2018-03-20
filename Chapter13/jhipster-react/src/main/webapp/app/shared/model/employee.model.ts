import { IUser } from './user.model';

export interface IEmployee {
  id?: number;
  name?: string;
  age?: number;
  dob?: any;
  user?: IUser;
}

export class Employee implements IEmployee {
  constructor(public id?: number, public name?: string, public age?: number, public dob?: any, public user?: IUser) {}
}
