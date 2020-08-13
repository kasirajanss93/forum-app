import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "posts" })
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  content: string;

  @Column()
  user: string;

  @Column()
  title: string;

  @Column()
  date: Date;

  @Column("json")
  reactions: {
    thumbsUp: number;
    hooray: number;
    heart: number;
    rocket: number;
    eyes: number;
  };
}
