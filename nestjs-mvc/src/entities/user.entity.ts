import { Role } from "@/common/enums/role.enum";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { USER_GENDER, USER_STATUS } from "../common/enums/user.enum";

/**
 * 列选项参考
 * https://typeorm.biunav.com/zh/entities.html#%E5%88%97%E9%80%89%E9%A1%B9
 **/
@Entity("user")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ comment: "主键id" })
  id: number;

  @PrimaryColumn({ type: "varchar", name: "user_name", comment: "用户名" })
  username: string;

  @Column({ type: "varchar", name: "nick_name", comment: "用户昵称" })
  nickname: string;

  @Column({
    type: "varchar",
    name: "avatar",
    comment: "用户头像",
    nullable: true,
  })
  avatar: string;

  @Column({
    type: "varchar",
    name: "email",
    comment: "用户邮箱",
    nullable: true,
  })
  email: string;

  @Column({
    type: "varchar",
    name: "password",
    comment: "用户密码",
    nullable: true,
  })
  password: string;

  @Column({
    type: "int",
    name: "gid",
    comment: "Github Id",
    nullable: true,
  })
  gid: number;

  @Column({
    type: "varchar",
    name: "status",
    comment: "用户状态",
    default: USER_STATUS.NOR,
  })
  status: string;

  @Column({
    type: "varchar",
    default: USER_GENDER.UNKNOWN,
    name: "gender",
    comment: "性别",
  })
  gender: string;

  @Column({
    type: "varchar",
    name: "admin_level",
    nullable: true,
    comment: "管理员等级",
    default: Role.USER,
  })
  level: string;

  @CreateDateColumn({
    name: "update_at",
    comment: "更新时间",
    nullable: true,
  })
  updateAt: Date;

  @UpdateDateColumn({
    name: "create_at",
    comment: "创建时间",
    nullable: true,
  })
  createAt: Date;
}
