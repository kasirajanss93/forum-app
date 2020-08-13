import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class CreatePostUserFk1597115233621 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "posts",
      new TableForeignKey({
        columnNames: ["user"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE"
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("posts");
    const foreignKey = table.foreignKeys.find(
      fk => fk.columnNames.indexOf("user") !== -1
    );
    await queryRunner.dropForeignKey("posts", foreignKey);
  }
}
