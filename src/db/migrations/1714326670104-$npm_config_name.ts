import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1714326670104 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE USERS (
            id SERIAL PRIMARY KEY,
            name varchar(100) NOT NULL,
            email varchar(100) NOT NULL,
            username varchar(100) NOT NULL,
            password varchar(100) NOT NULL,
            borndate date NOT NULL,
            CONSTRAINT user_un_username UNIQUE (username),
            CONSTRAINT user_un_password UNIQUE (password)
        )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS USERS`);
  }
}
