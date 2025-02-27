import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationGenerate1740616151427 implements MigrationInterface {
    name = 'MigrationGenerate1740616151427'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cad_transaction" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "amount" float NOT NULL, "type" varchar(255) NOT NULL, "user_id" integer NOT NULL, "create_date" datetime NOT NULL DEFAULT (datetime('now')), "updated_date" datetime NOT NULL DEFAULT (datetime('now')), "deleted_date" datetime)`);
        await queryRunner.query(`CREATE TABLE "cad_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar(100) NOT NULL, "password_hash" varchar(255) NOT NULL, "create_date" datetime NOT NULL DEFAULT (datetime('now')), "updated_date" datetime NOT NULL DEFAULT (datetime('now')), "deleted_date" datetime)`);
        await queryRunner.query(`CREATE TABLE "temporary_cad_transaction" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "amount" float NOT NULL, "type" varchar(255) NOT NULL, "user_id" integer NOT NULL, "create_date" datetime NOT NULL DEFAULT (datetime('now')), "updated_date" datetime NOT NULL DEFAULT (datetime('now')), "deleted_date" datetime, CONSTRAINT "FK_970ca97d3ec67dc22ce14686c5b" FOREIGN KEY ("user_id") REFERENCES "cad_user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_cad_transaction"("id", "amount", "type", "user_id", "create_date", "updated_date", "deleted_date") SELECT "id", "amount", "type", "user_id", "create_date", "updated_date", "deleted_date" FROM "cad_transaction"`);
        await queryRunner.query(`DROP TABLE "cad_transaction"`);
        await queryRunner.query(`ALTER TABLE "temporary_cad_transaction" RENAME TO "cad_transaction"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cad_transaction" RENAME TO "temporary_cad_transaction"`);
        await queryRunner.query(`CREATE TABLE "cad_transaction" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "amount" float NOT NULL, "type" varchar(255) NOT NULL, "user_id" integer NOT NULL, "create_date" datetime NOT NULL DEFAULT (datetime('now')), "updated_date" datetime NOT NULL DEFAULT (datetime('now')), "deleted_date" datetime)`);
        await queryRunner.query(`INSERT INTO "cad_transaction"("id", "amount", "type", "user_id", "create_date", "updated_date", "deleted_date") SELECT "id", "amount", "type", "user_id", "create_date", "updated_date", "deleted_date" FROM "temporary_cad_transaction"`);
        await queryRunner.query(`DROP TABLE "temporary_cad_transaction"`);
        await queryRunner.query(`DROP TABLE "cad_user"`);
        await queryRunner.query(`DROP TABLE "cad_transaction"`);
    }

}
