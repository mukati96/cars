

export class User {
    id?: string;
    // tslint:disable-next-line: variable-name
    full_name!: string;
    email?: string;
    password?: string;
    city?: string;
    // tslint:disable-next-line: variable-name
    is_dealer?: boolean;
    // tslint:disable-next-line: variable-name
    is_seller?: boolean;
    // tslint:disable-next-line: variable-name
    phone_number!: number;
    // tslint:disable-next-line: variable-name
    profile_pic!: string;
    // tslint:disable-next-line: variable-name
    auth_token?: string;
}