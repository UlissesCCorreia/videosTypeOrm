import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1714326815541 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //await queryRunner.query('CREATE EXTENSION IF NOT EXISTS ')
    await queryRunner.query(`
            CREATE TABLE VIDEO (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                url TEXT NOT NULL,
                recommendedAge INT NOT NULL
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS VIDEO`);
  }
}
