import {Logger} from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

dotenv.config();

const updateSeeds = (dirname: string) => {
    fs.readdir(dirname, (err, filenames) => {
        if (err) {
            Logger.error(err);
            return;
        }

        const files = filenames.filter(
            (filename) => filename.includes('.js') && !filename.includes('.map'),
        );

        files.forEach((seedFile) => {
            Logger.log(`Processing ${seedFile}..`);
            fs.readFile(dirname + seedFile, 'utf-8', (err, content) => {
                if (err) {
                    Logger.error(err);
                    return;
                }
                fs.writeFile(dirname + seedFile, content, 'utf8', (err) => {
                    if (err) {
                        Logger.error(err);
                        return;
                    }
                    Logger.log(`${seedFile} successfully updated.`);
                });
            });
        });
    });
};

updateSeeds(
    path.join(__dirname, 'dist', 'src', 'database', 'seeds', '/'),
);
