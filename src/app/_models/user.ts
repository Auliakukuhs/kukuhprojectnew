import {Role} from './role';
import {Moment} from 'moment';

export class User {
  id!: string;
  username!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  birthDate!: Moment;
  basicSalary: number | undefined;
  status: string | undefined;
  group!: string;
  description: string | undefined;
  isDeleting = false;
}
