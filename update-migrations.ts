import { Logger } from "@nestjs/common";
import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";
import { DB_MAIN } from "@ar7profacex/shared";

dotenv.config();

const updateMigrations = (dirname: string) => {
  fs.readdir(dirname, (err, filenames) => {
    if (err) {
      Logger.error(err);
      return;
    }

    const migrationsFiles = filenames.filter(
      (filename) => filename.includes(".js") && !filename.includes(".map")
    );

    migrationsFiles.forEach((migrationFile) => {
      Logger.log(`Processing ${migrationFile}..`);
      fs.readFile(dirname + migrationFile, "utf-8", (err, content) => {
        if (err) {
          Logger.error(err);
          return;
        }

        const updatedContent = content.replace(
          /api_v2/g,
          DB_MAIN
        );
        fs.writeFile(dirname + migrationFile, updatedContent, "utf8", (err) => {
          if (err) {
            Logger.error(err);
            return;
          }
          Logger.log(`${migrationFile} successfully updated.`);
        });
      });
    });
  });
};

updateMigrations(
  path.join(__dirname, "dist", "src", "database", "migrations", "/")
);
