export type TUserData = {
    id: number;
    name: string;
    avatar: string;
    createdAt: string;
};

export type CreateUserData = {
    name: string;
    avatar: string;
};

export type UpdateUserData = CreateUserData & { id: number };