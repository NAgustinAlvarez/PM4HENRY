export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    phone: number;
    birthdate: string;
    country?: string;
    address?: string;
    city?: string;
    confirmPassword: string;
    constructor(partial: Partial<CreateUserDto>);
}
