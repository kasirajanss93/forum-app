import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1596509349954 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()"
          },
          {
            name: "name",
            type: "varchar"
          },
          {
            name: "username",
            type: "varchar"
          },
          {
            name: "first_name",
            type: "varchar"
          },
          {
            name: "last_name",
            type: "varchar"
          }
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
