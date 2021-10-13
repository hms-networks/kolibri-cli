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

export class UserGetHistoryCommand extends Command {
    constructor() {
        super('user.getHistory', { description: 'Get all values from the user state history on the Kolibri Broker' });
        this.option('user', { description: 'user', type: 'string', optional: true });
        this.option('client', { description: 'client', type: 'string', optional: true });
        this.option('path', { description: 'path', type: 'string', optional: true });
        this.option('from', { description: 'from', type: 'number', optional: true });
        this.option('to', { description: 'to', type: 'number', optional: true });
        this.option('limit', { description: 'limit', type: 'number', optional: true });
        this.option('ascending', { description: 'ascending', type: 'boolean', optional: true });
    }
}
