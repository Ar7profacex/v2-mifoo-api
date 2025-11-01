import { Factory, Seeder } from "@arrimo/typeorm-seeding";
import { DataSource } from "typeorm";
import { logNormal } from "src/common/utils/utils.utils";
import { DB_MAIN } from "src/common/utils/constants";
export default class DBSetup implements Seeder {
  env = DB_MAIN;

  public async run(factory: Factory, connection: DataSource): Promise<any> {
    logNormal("INFO", "DB SETUP");
    const queryRunner = connection.createQueryRunner();
    logNormal("INFO", "CREATE SEEDERS TABLE");
    await queryRunner.query(`
    create table  if not exists seeders_typeorm
    (
      id bigint
        constraint seeders_pk
          primary key,
      name varchar default null,
      section varchar default null,
      date timestamp default null
    )
`);
    logNormal("INFO", "RUN MIGRATIONS");
    await connection.runMigrations({
      transaction: "all",
    });
  }
}
