import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("message")
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int", {
    name: "be_commented_id",
    comment: "评论内容ID -1为看板 0<为博文",
    nullable: true,
  })
  beCommentedId?: number;

  @Column("int", { name: "from_id", comment: "用户id" })
  fromId: number;

  @Column("int", { name: "to_id", comment: "对用户id", nullable: true })
  toId: number;

  @Column("text", { name: "content", comment: "评论内容" })
  content: string;

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
