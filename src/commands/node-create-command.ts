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

export class NodeCreateCommand extends Command {
    constructor() {
        super('node.create', { description: 'Create a node (group or point) in the project in the Kolibri Broker' });
        this.option('path', { description: 'path', type: 'string' });
        this.option('type', { description: 'type', type: 'number' });
        this.option('description', { description: 'description', type: 'string', optional: true });
        this.option('flags', { description: 'flags', type: 'number', optional: true });
        this.option('dataType', { description: 'dataType', type: 'number', optional: true });
        this.option('triggerMode', { description: 'triggerMode', type: 'number', optional: true });
        this.option('triggerN', { description: 'dataType', type: 'number', optional: true });
        this.option('triggerT', { description: 'triggerT', type: 'number', optional: true });
        this.option('triggerDomain', { description: 'triggerDomain', type: 'number', optional: true });
        this.option('qosLevel', { description: 'qosLevel', type: 'number', optional: true });
        this.option('history', { description: 'history', type: 'number', optional: true });
        this.option('format', { description: 'format', type: 'string', optional: true });
        this.option('scalingFactor', { description: 'scalingFactor', type: 'number', optional: true });
        this.option('scalingOffset', { description: 'scalingOffset', type: 'number', optional: true });
        this.option('writeRangeMin', { description: 'writeRangeMin', type: 'number', optional: true });
        this.option('writeRangeMax', { description: 'writeRangeMax', type: 'number', optional: true });
    }
}
