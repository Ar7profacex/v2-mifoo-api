import * as dotenv from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

dotenv.config();
console.log(`🚀 ~ process.env:`, process.env)

const options: DataSourceOptions = {
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  entities: ["dist/**/*.entity.js"],
  migrations: ["dist/**/migrations/*.js"],
  /*extra: {
    ...(process.env.ENV === 'prod' && {
      ssl: {
        rejectUnauthorized: false,
      }
    }),
  },*/

};

export default {
  ...options,
  autoLoadEntities: true,
  seeds: ["dist/**/seeds/*.js"],
  factories: ["dist/**/factories/*.js"],
  subscribers: ["dist/src/common/subscribers/entities/*.subscriber{.ts,.js}"],
  cli: {
    migrationsDir: "src/database/migrations",
  },
  migrationsTableName: 'migrations_typeorm',
} as TypeOrmModuleOptions;

export const AppDataSource = new DataSource(options);
