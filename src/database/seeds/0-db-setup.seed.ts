import { DB_MAIN, logNormal } from "@ar7profacex/shared";
import { Factory, Seeder } from "@arrimo/typeorm-seeding";
import { DataSource } from "typeorm";
export default class DBSetup implements Seeder {
  env = DB_MAIN;

  public async run(factory: Factory, connection: DataSource): Promise<any> {
    logNormal("INFO", "DB SETUP");
    const queryRunner = connection.createQueryRunner();
    logNormal("INFO", "CREATE SEEDERS TABLE");
    await queryRunner.query(`
   CREATE TABLE IF NOT EXISTS seeders_typeorm (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) DEFAULT NULL,
    section VARCHAR(255) DEFAULT NULL,
    date TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
    );
`);
    logNormal("INFO", "RUN MIGRATIONS");
    await connection.runMigrations({
      transaction: "all",
    });
  }
}
