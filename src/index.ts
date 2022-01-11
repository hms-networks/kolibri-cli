#!/usr/bin/env node

/*
* Copyright 2021 HMS Industrial Networks AB
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http: //www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/


import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { homedir } from 'os';
import { dirname } from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { Environment } from './environment';
import { KolibriCli } from './kolibri-cli';


async function main() {
    try {
        const defaultConfigFile: string = `${homedir()}/.kolibri-cli/config.env`;
        createDefaultConfigFileIfNotExists(defaultConfigFile);

        const configFile = await parseConfigFileArg() ?? defaultConfigFile;

        let environment: Environment;
        try {
            environment = loadConfigFile(configFile);
        }
        catch (e: any) {
            console.error(`Failed to load config file ${configFile}`);
            console.error(String(e.message));
            return;
        }

        const cli = new KolibriCli(environment);
        await cli.runOrRepl();
    }
    catch (e: any) {
        console.error('[failed]', String(e.message));
    }
}

function loadConfigFile(configFile: string) {
    const environment: Environment = new Environment();
    const replMode: boolean = hideBin(process.argv).length < 1;
    if (!replMode) {
        environment.loadConfig(configFile);
    }
    return environment;
}

async function parseConfigFileArg() {
    const configFileArg = 'config-file';

    const yargsInstance = yargs(hideBin(process.argv))
        .parserConfiguration({
            'camel-case-expansion': false
        });
    const argv = await yargsInstance.argv;

    let path;
    if (argv[configFileArg]) {
        path = argv[configFileArg] as string;
        removeItemFromArgvIfExists(`--${configFileArg}`);
    }
    return path;
}

function removeItemFromArgvIfExists(item: string) {
    const indexPath = process.argv.indexOf(item);
    if (indexPath !== -1) {
        process.argv.splice(indexPath, 2);
    }
}

function createDefaultConfigFileIfNotExists(path: string) {
    if (!existsSync(path)) {
        const dir = dirname(path);

        if (!existsSync(dir)) {
            mkdirSync(dir);
        }

        const fileContent = [
            'KOLIBRI_CONNECT_HOST=http://localhost:8080',
            'KOLIBRI_CONNECT_PROJECT=management',
            'KOLIBRI_CONNECT_HOST_PATH=/',
            'KOLIBRI_LOGIN_USER=',
            'KOLIBRI_LOGIN_PASSWORD=',
            'KOLIBRI_LOGIN_INTERVAL=60',
            'KOLIBRI_LOGIN_TIMEOUT=10'
        ];

        const newLine = '\r\n';
        writeFileSync(path, fileContent.join(newLine));
    }
}

main();
