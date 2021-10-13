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

export class SubscribeCommand extends Command {
    constructor() {
        super('subscribe', { description: 'Subscribe to a node' });
        this.option('path', { description: 'Path name identifying the node to be subscribed', type: 'string' });
        this.option('formatted', { description: 'Values are transmitted with scaling and formatting applied according to the node properties', optional: true, type: 'boolean' });
        this.option('ignoreMissing', { description: 'If set, a non-existing path will be ignored else non-existing paths will trigger an RPC error', optional: true, type: 'boolean' });
        this.option('respectCommit', { description: 'If set, transactions are used to else no transactions are used.', optional: true, type: 'boolean' });
        this.option('resume', { description: 'History data values starting from the last successful kolibri.write RPC will be included in the initial dataset', optional: true, type: 'boolean' });
        this.option('from', { description: 'History data values starting from the specified timestamp will be included in the initial dataset send by the kolibri.write', optional: true, type: 'number' });
    }
}
