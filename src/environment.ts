

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


import { ClientConfig, LoginParams } from '@hms-networks/kolibri-js-client';
import dotenv from 'dotenv';


export class Environment {
    private kolibriConnectHost: string = 'http://localhost:8080';
    private kolibriConnectProject: string = 'management';
    private kolibriConnectHostPath: string = '/';
    private kolibriLoginUser: string = '';
    private kolibriLoginPassword: string = '';
    private kolibriLoginInterval: number = 60;
    private kolibriLoginTimeout: number = 5;

    private kolibriLoginClient?: string = 'kolibri-cli';
    private kolibriLoginPendingTransactions?: boolean = false;
    private kolibriLoginSessionExpire?: number = 0;

    private _kolibriCliForceRawOutput: boolean = false;

    /**
     * Initializes environment with optional config applied for scripted and repl modes.
     * Overrides config from the ENV.
     */
    public constructor() {
        this._kolibriCliForceRawOutput = this.parseBoolean(this.getOrDefault('KOLIBRI_CLI_FORCE_RAW_OUTPUT', 'false'));
    }

    public loadConfig(path: string): void {
        const result = dotenv.config({ path: path });
        if (result.error) {
            throw result.error;
        }

        // Required
        this.kolibriConnectHost = this.getOrThrow('KOLIBRI_CONNECT_HOST');
        this.kolibriConnectProject = this.getOrThrow('KOLIBRI_CONNECT_PROJECT');
        this.kolibriConnectHostPath = this.getOrThrow('KOLIBRI_CONNECT_HOST_PATH');
        this.kolibriLoginUser = this.getOrThrow('KOLIBRI_LOGIN_USER');
        this.kolibriLoginPassword = this.getOrThrow('KOLIBRI_LOGIN_PASSWORD');
        this.kolibriLoginInterval = parseInt(this.getOrThrow('KOLIBRI_LOGIN_INTERVAL'));
        this.kolibriLoginTimeout = parseInt(this.getOrThrow('KOLIBRI_LOGIN_TIMEOUT'));

        // Optional
        this.kolibriLoginClient = this.getOrDefault('KOLIBRI_LOGIN_CLIENT', 'kolibri-cli');
        this.kolibriLoginPendingTransactions = this.parseBoolean(this.getOrDefault('KOLIBRI_LOGIN_PENDING_TRANSACTIONS', 'false'));
        this.kolibriLoginSessionExpire = parseInt(this.getOrDefault('KOLIBRI_LOGIN_SESSION_EXPIRE', '0'));
    }

    public getConnectParams(): ClientConfig {
        return { host: this.kolibriConnectHost, project: this.kolibriConnectProject, path: this.kolibriConnectHostPath };
    }

    public getLoginParams(): LoginParams {
        return {
            user: this.kolibriLoginUser,
            password: this.kolibriLoginPassword,
            interval: this.kolibriLoginInterval,
            timeout: this.kolibriLoginTimeout,
            client: this.kolibriLoginClient,
            pendingTransactions: this.kolibriLoginPendingTransactions,
            sessionExpire: this.kolibriLoginSessionExpire
        };
    }

    public get kolibriCliForceRawOutput(): boolean {
        return this._kolibriCliForceRawOutput;
    }

    private getOrDefault(envVar: string, defaultVar: string) {
        if (process.env[envVar]) {
            return process.env[envVar]!;
        }
        else {
            return defaultVar;
        }
    }

    private getOrThrow(envVar: string): string {
        if (process.env[envVar]) {
            return process.env[envVar]!;
        }
        else {
            throw new Error(`Missing Environment Variable: ${envVar}`);
        }
    }

    private parseBoolean(value: string): boolean {
        return (value === 'true');
    }
}
