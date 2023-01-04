export enum RoleID {
  User = 1,
  Admin = 2,
}

export enum Role {
  User = 'user',
  Admin = 'admin',
}

export interface IRole {
  role_id: number;
  name: string;
}
