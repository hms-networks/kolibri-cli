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

export class ProjectModifyCommand extends Command {
    constructor() {
        super('project.modify', { description: 'Modify a project on the Kolibri Broker' });
        this.option('project', { description: 'project', type: 'string' });
        this.option('description', { description: 'description', type: 'string', optional: true });
        this.option('limitHistoryPoint', { description: 'limitHistoryPoint', type: 'number', optional: true });
        this.option('limitHistoryUser', { description: 'limitHistoryUser', type: 'number', optional: true });
        this.option('active', { description: 'active', type: 'boolean', optional: true });
        this.option('kolibriProdVersionRange', { description: 'kolibriProdVersionRange', type: 'string', optional: true });
        this.option('kolibriConsVersionRange', { description: 'kolibriConsVersionRange', type: 'string', optional: true });
    }
}
