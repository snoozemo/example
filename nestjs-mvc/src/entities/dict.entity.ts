import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

// 这里可以修改表名
@Entity("dict")
export class Dict extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int", { name: "pid", comment: "父ID", nullable: true })
  pid: number;

  @Column("text", { name: "name", comment: "字典名" })
  name: string;

  @Column("text", { name: "key", comment: "键" })
  key: string;

  @Column("text", { name: "value", comment: "值" })
  value: string;

  @Column("int", { name: "create_user_id", comment: "创建人ID" })
  createUserId: number;

  @Column("text", { name: "desc", comment: "简介", nullable: true })
  desc: string;

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
