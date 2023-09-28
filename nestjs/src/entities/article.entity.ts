import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

// 这里可以修改表名
@Entity("article")
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int", { name: "author_id", comment: "作者id" })
  authorId: number;

  @Column("text", { name: "prev", comment: "预览内容", default: "" })
  prev: string;

  @Column("text", {
    name: "prev_imgs",
    comment: "预览图片",
    nullable: true,
  })
  prevImgs: string;

  @Column("text", { name: "url", comment: "文章链接", default: "" })
  url: string;

  @Column("text", { name: "tags", comment: "标签", nullable: true })
  tags: string;

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
