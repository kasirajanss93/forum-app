import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePostsTable1594693828929 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "posts",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()"
          },
          {
            name: "content",
            type: "text"
          },
          {
            name: "user",
            type: "uuid"
          },
          {
            name: "title",
            type: "text"
          },
          {
            name: "date",
            type: "timestamp with time zone"
          },
          {
            name: "reactions",
            type: "json",
            default:
              '\'{ "thumbsUp": 0, "hooray": 0, "heart": 0, "rocket": 0, "eyes": 0 }\''
          }
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("posts");
  }
}
