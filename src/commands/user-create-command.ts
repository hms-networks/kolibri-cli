import { Command } from 'bandersnatch';

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


export class UserCreateCommand extends Command {
    constructor() {
        super('user.create', { description: 'Create a user on the Kolibri Broker' });
        this.option('user', { description: 'user', type: 'string' });
        this.option('password', { description: 'password', type: 'string' });
        this.option('project', { description: 'project', type: 'string', optional: true });
        this.option('description', { description: 'description', type: 'string', optional: true });
        this.option('active', { description: 'active', type: 'boolean', optional: true });
    }
}
