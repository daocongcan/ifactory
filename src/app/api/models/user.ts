/* tslint:disable */
import { Company } from './company';
import { Role } from './role';

/**
 */
export class User {
    _id?: number;
    name_user?: string;
    email?: string;
    password?:string;
    id_company?: number;
    id_role?: number;
}
