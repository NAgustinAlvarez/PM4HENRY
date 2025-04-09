export declare class UserResponseDto {
    id: string;
    name: string;
    email: string;
    phone: number;
    country?: string;
    adress?: string;
    city?: string;
    role?: string;
    constructor(partial: Partial<UserResponseDto>);
}
