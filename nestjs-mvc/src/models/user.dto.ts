import { ListDto } from "./list.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from "class-validator";
export class GetUserDto {
  @ApiProperty()
  @Transform(({ value }) => value && +value)
  @IsInt({ message: "用户ID参数不合规" })
  readonly id: number;
}

export class DeleteUserDto extends GetUserDto {}

export class GetUsersDto extends ListDto {
  @ApiProperty()
  @IsOptional()
  @IsString({ message: "用户名不合规" })
  readonly username?: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: "用户昵称不合规" })
  readonly nickname?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumberString(null, { message: "用户ID不合规" })
  readonly id?: number;
}

export class LoginDto {
  @ApiProperty({ type: "string", default: "test@email.com" })
  @IsEmail({}, { message: "邮箱不合规" })
  @IsNotEmpty({ message: "邮箱为空" })
  readonly email: string;

  @ApiProperty({ type: "string", default: "123456" })
  @IsString({ message: "密码不合规" })
  @IsNotEmpty({ message: "密码不为空" })
  readonly password: string;
}
export class LoginByGithubOAuthDto {
  @ApiProperty()
  @IsString({ message: "CODE不合规" })
  @IsNotEmpty({ message: "CODE不为空" })
  readonly code?: string;
}

export class PostUserDto {
  @ApiProperty({ minLength: 3, maxLength: 20 })
  @IsNotEmpty({ message: "用户名不为空" })
  @Length(3, 20, { message: "用户名长度 3~20" })
  @IsString({ message: "用户名不合规" })
  readonly username: string;

  @ApiProperty({ minLength: 3, maxLength: 20 })
  @IsNotEmpty({ message: "昵称不为空" })
  @IsString({ message: "昵称不合规" })
  @Length(3, 20, { message: "昵称长度 3~20" })
  readonly nickname: string;

  @ApiProperty({ minLength: 3, maxLength: 100 })
  @Length(5, 100, { message: "邮箱长度 6~40" })
  @IsNotEmpty({ message: "邮箱不为空" })
  @IsEmail({}, { message: "邮箱不合规" })
  readonly email: string;

  @ApiProperty({ minLength: 5, maxLength: 100 })
  @Length(5, 100, { message: "密码长度 6~40" })
  @IsNotEmpty({ message: "密码不为空" })
  @IsString({ message: "密码不合规" })
  password: string;

  @ApiProperty({ minLength: 5, maxLength: 200 })
  @IsOptional()
  @IsUrl({}, { message: "头像链接不合规" })
  @Length(5, 200, { message: "头像链接长度 5~200" })
  readonly avatar: string;
}

export class PostUserByGithubOAuthDto {
  username: string;
  readonly nickname: string;
  readonly gid: number;
  readonly avatar: string;
}

export class PutUserDto {
  id: number;

  @ApiProperty({ minLength: 3, maxLength: 20 })
  @IsOptional()
  @IsString({ message: "用户名不合规" })
  @IsNotEmpty({ message: "用户名不为空" })
  @Length(3, 20, { message: "用户名长度 3~20" })
  readonly username: string;

  @ApiProperty({ minLength: 3, maxLength: 20 })
  @IsOptional()
  @IsString({ message: "昵称不合规" })
  @IsNotEmpty({ message: "昵称不为空" })
  @Length(3, 20, { message: "昵称长度 3~20" })
  readonly nickname: string;

  @ApiProperty({ minLength: 5, maxLength: 100 })
  @IsOptional()
  @IsString({ message: "密码不合规" })
  @IsNotEmpty({ message: "密码不为空" })
  @Length(5, 100, { message: "密码长度 6~40" })
  password: string;

  @ApiProperty({ minLength: 5, maxLength: 200 })
  @IsOptional()
  @Length(5, 200, { message: "头像链接长度 5~200" })
  @IsUrl({}, { message: "头像链接不合规" })
  readonly avatar: string;

  @ApiProperty()
  @IsOptional()
  @IsNumberString({}, { message: "性别不合规" })
  @IsNotEmpty({ message: "性别不为空" })
  readonly gender: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail({}, { message: "邮箱不合规" })
  @IsNotEmpty({ message: "邮箱不为空" })
  readonly email: string;
}
