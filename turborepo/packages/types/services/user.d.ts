declare namespace Api {
  export interface UsersItemVo {
    avatar?: string;
    createAt: string;
    id: number;
    level: string;
    nickname: string;
    status: string;
    updateAt: string;
    username: string;
  }
  export interface UserVo {
    avatar: string;
    email?: string;
    id: number;
    nickname: string;
    username: string;
  }
  export interface UserByPublicVo extends Omit<UserVo, "email"> {}
  export interface LoginDto {
    email?: string;
    password?: string;
    code?: string;
  }
  export interface PostUserDto {
    avatar: string;
    email: string;
    nickname: string;
    password: string;
    username: string;
  }
  export interface PutUserDto extends PostUserDto {
    gender: string;
  }
  export interface GetUserDto {
    id: number;
  }
  export interface DeleteUserDto extends GetUserDto {}
  export interface GetUsersDto extends ListDto {
    id?: number;
    nickname?: string;
    username?: string;
  }
}
