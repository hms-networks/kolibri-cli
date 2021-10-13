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

export class PermissionRpcRemoveCommand extends Command {
    constructor() {
        super('permission.rpc.remove', { description: 'Remove RPC permissions for specified user on the Kolibri Broker' });
        this.option('user', { description: 'user', type: 'string' });
        this.option('rpcs', { description: 'rpcs', type: 'array' });
        this.option('project', { description: 'project', type: 'string', optional: true });
        this.option('server', { description: 'server', type: 'string', optional: true });
    }
}
