import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "posts" })
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  content: string;

  @Column()
  user: string;
}
