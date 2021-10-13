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


import { Command } from 'bandersnatch';

export class ConnectCommand extends Command {
    constructor() {
        super('connect', { description: 'Connects to the Kolibri Broker' });
        this.option('host', { description: 'Hostname', type: 'string', default: 'ws://localhost:8080' });
        this.option('project', { description: 'project', type: 'string', default: 'management' });
        this.option('path', { description: 'path', type: 'string', default: '/' });
    }
}
