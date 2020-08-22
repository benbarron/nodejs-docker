export interface CreateUserDTO {
    name: string;
    email: string;
    password: string;
}

export interface UpdateUserDTO {
    name: string;
    email: string;
}

export interface LoginDTO {
    email: string;
    password: string;
}
