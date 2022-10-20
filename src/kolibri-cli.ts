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

import { Program } from 'bandersnatch';

import {
    ClientConfig, KolibriClient, KolibriClientFactory, LoginParams,
    NodeBrowseParams, NodeCreateParams, NodeDeleteHistoryParams, NodeDeleteParams,
    NodeGetHistoryParams, NodeGetPropertiesParams, NodeModifyParams, PermissionNodeListParams,
    PermissionNodeSetParams, PermissionRpcAddParams, PermissionRpcListParams, PermissionRpcRemoveParams,
    PermissionUserListParams, ProjectBrowseParams, ProjectCreateParams, ProjectDeleteParams,
    ProjectGetHistoryUsageParams, ProjectGetLiveUsageParams, ProjectGetPropertiesParams,
    ProjectGetStatisticsParams, ProjectModifyParams, ReadParams, SubscribeParams, UnsubscribeParams, UserBrowseParams, UserCreateParams,
    UserDeleteParams, UserGetHistoryParams, UserGetPropertiesParams, UserGetSessionsParams,
    UserGroupAddMemberParams, UserGroupBrowseParams, UserGroupCreateParams, UserGroupDeleteParams,
    UserGroupGetPropertiesParams, UserGroupIsMemberParams, UserGroupListMembersParams,
    UserGroupModifyParams, UserGroupRemoveMemberParams, UserModifyParams, UserSubscribeParams, UserUnsubscribeParams
} from '@hms-networks/kolibri-js-client';

import {
    WriteCommand, ReadCommand, CloseCommand, ConnectCommand, LoginCommand, NodeBrowseCommand, NodeCreateCommand, NodeDeleteCommand,
    NodeDeleteHistoryCommand, NodeGetHistoryCommand, NodeGetPropertiesCommand, NodeModifyCommand, PermissionNodeListCommand,
    PermissionNodeSetCommand, PermissionRpcAddCommand, PermissionRpcListCommand, PermissionRpcRemoveCommand, PermissionUserListCommand,
    ProjectBrowseCommand, ProjectCreateCommand, ProjectDeleteCommand, ProjectGetHistoryUsageCommand, ProjectGetLiveUsageCommand,
    ProjectGetPropertiesCommand, ProjectGetStatisticsCommand, ProjectModifyCommand, SubscribeCommand, UserGetHistoryCommand,
    UserGroupAddMemberCommand, UserGroupBrowseCommand, UserGroupCreateCommand, UserGroupDeleteCommand, UserGroupGetPropertiesCommand,
    UserGroupIsMemberCommand, UserGroupListMembersCommand, UserGroupModifyCommand, UserGroupRemoveMemberCommand, UserBrowseCommand,
    UserCreateCommand, UserDeleteCommand, UserGetPropertiesCommand, UserGetSessionCommand, UserModifyCommand, UnsubscribeCommand, UserSubscribeCommand, UserUnsubscribeCommand
} from './commands';

import { Environment } from './environment';


export class KolibriCli extends Program {
    private client?: KolibriClient;
    private connected: boolean = false;
    private loggedIn: boolean = false;

    constructor(private readonly environment: Environment) {
        super({ help: true, parserConfiguration: { 'strip-dashed': true } });

        this.addKolibriCommands();
        this.on('run', (cmd: string | readonly string[]) => {
            if (this.isRepl()) {
                if (cmd.includes('help') || cmd.includes('--version') || cmd.includes('connect')) {
                    return;
                }

                if (!this.connected && !this.loggedIn) {
                    console.error('You need to connect and login before executing RPC commands');
                }
            }
        });
    }

    override async runOrRepl() {
        super.runOrRepl()
            .then(async (result: unknown) => {
                if (result !== undefined) {
                    let stdout = result;
                    if (this.environment.kolibriCliForceRawOutput) {
                        try {
                            stdout = JSON.stringify(result);
                        }
                        catch (e) {
                            // some commands to not return a JSON string
                            stdout = result;
                        }
                    }
                    console.log(stdout);
                }
                if (!this.isRepl()) {
                    await this.client?.disconnect();
                    process.exit(0);
                }
            }).catch(async (e) => {
                console.error('[failed]', String(e.message));
                if (!this.isRepl()) {
                    await this.client?.disconnect();
                    process.exit(1);
                }
            });
    }

    async connect(args: ClientConfig): Promise<string> {
        this.client = KolibriClientFactory.create(args);

        this.client?.addOnDisconnectListener(async (event: any) => {
            console.log('You were disconnected');
            this.connected = false;
            if (event) {
                console.log('code: ' + event.code + ' reason: ' + event.reason);
            }
        });

        try {
            await this.client?.connect();
            this.connected = true;
            return 'OK';
        }
        catch (e) {
            throw e;
        }
    }

    async login(args: LoginParams) {
        const result = await this.client?.login(args);
        this.loggedIn = true;
        return result;
    }

    async write(args: any) {
        await this.onNotReplConnectAndLogin();
        switch (args.datatype) {
            case 'boolean': args.value = (args.value === 'true');
                break;
            case 'number': args.value = Number(args.value);
                break;
            case 'string': args.value = String(args.value);
                break;
            default:
                throw new Error('--datatype option missing or invalid. Valid options boolean | number | string');
        }
        delete args.datatype;

        return this.client?.write({ nodes: [args] });
    }

    async read(args: ReadParams) {
        await this.onNotReplConnectAndLogin();
        return this.client?.read([args]);
    }

    async subscribe(args: SubscribeParams) {
        await this.onNotReplConnectAndLogin();
        this.client?.addOnWriteListener((data: any) => {
            console.info(data);
        });

        return this.client?.subscribe([args]);
    }

    async unsubscribe(args: UnsubscribeParams) {
        await this.onNotReplConnectAndLogin();
        this.client?.addOnWriteListener(() => {
            // clear listener
        });
        return this.client?.unsubscribe([args]);
    }

    async close() {
        await this.onNotReplConnectAndLogin();
        return this.client?.close();
    }

    async userBrowse(args: UserBrowseParams) {
        await this.onNotReplConnectAndLogin();
        return this.client?.userBrowse(args);
    }

    async userCreate(args: UserCreateParams) {
        await this.onNotReplConnectAndLogin();
        return this.client?.userCreate(args);
    }

    async userDelete(args: UserDeleteParams) {
        await this.onNotReplConnectAndLogin();
        return this.client?.userDelete(args);
    }

    async userModify(args: UserModifyParams) {
        await this.onNotReplConnectAndLogin();
        return this.client?.userModify(args);
    }

    async userGetProperties(args: UserGetPropertiesParams) {
        await this.onNotReplConnectAndLogin();
        return this.client?.userGetProperties(args);
    }

    async userSubscribe(args: UserSubscribeParams) {
        await this.onNotReplConnectAndLogin();
        this.client?.addOnUserNotifyListener((data: any) => {
            console.log(data);
        });
        return this.client?.userSubscribe([args]);
    }

    async userUnsubscribe(args: UserUnsubscribeParams) {
        await this.onNotReplConnectAndLogin();
        this.client?.addOnUserNotifyListener(() => {
            // clear listener
        });
        return this.client?.userUnsubscribe([args]);
    }

    async userGetSessions(args: UserGetSessionsParams) {
        await this.onNotReplConnectAndLogin();
        return this.client?.userGetSessions(args);
    }

    async userGetHistory(args: UserGetHistoryParams) {
        await this.onNotReplConnectAndLogin();
        return this.client?.userGetHistory(args);
    }

    async userGroupBrowse(args: UserGroupBrowseParams) {
        await this.onNotReplConnectAndLogin();
        return this.client?.userGroupBrowse(args);
    }

    async userGroupCreate(args: UserGroupCreateParams) {
        await this.onNotReplConnectAndLogin();
        return this.client?.userGroupCreate(args);
    }

    async userGroupModify(args: UserGroupModifyParams) {
        await this.onNotReplConnectAndLogin();
        return this.client?.userGroupModify(args);
    }

    async userGroupDelete(args: UserGroupDeleteParams) {
        await this.onNotReplConnectAndLogin();
        return this.client?.userGroupDelete(args);
    }

    async userGroupGetProperties(args: UserGroupGetPropertiesParams) {
        await this.onNotReplConnectAndLogin();
        return this.client?.userGroupGetProperties(args);
    }

    async userGroupAddMember(args: UserGroupAddMemberParams) {
        await this.onNotReplConnectAndLogin();
        return this.client?.userGroupAddMember(args);
    }

    async userGroupRemoveMember(args: UserGroupRemoveMemberParams) {
        await this.onNotReplConnectAndLogin();
        return this.client?.userGroupRemoveMember(args);
    }

    async userGroupListMembers(args: UserGroupListMembersParams) {
        await this.onNotReplConnectAndLogin();
        return this.client?.userGroupListMembers(args);
    }

    async userGroupIsMember(args: UserGroupIsMemberParams) {
        await this.onNotReplConnectAndLogin();
        return this.client?.userGroupIsMember(args);
    }

    async projectBrowse(args: ProjectBrowseParams) {
        await this.onNotReplConnectAndLogin();
        return this.client?.projectBrowse(args);
    }

    async projectCreate(args: ProjectCreateParams) {
        await this.onNotReplConnectAndLogin();
        return this.client?.projectCreate(args);
    }

    async projectModify(args: ProjectModifyParams) {
        await this.onNotReplConnectAndLogin();
        return this.client?.projectModify(args);
    }

    async projectDelete(args: ProjectDeleteParams) {
        await this.onNotReplConnectAndLogin();
        return this.client?.projectDelete(args);
    }

    async projectGetProperties(args: ProjectGetPropertiesParams) {
        await this.onNotReplConnectAndLogin();
        return this.client?.projectGetProperties(args);
    }

    async projectGetStatistics(args: ProjectGetStatisticsParams) {
        await this.onNotReplConnectAndLogin();
        return this.client?.projectGetStatistics(args);
    }

    async projectGetLiveUsage(args: ProjectGetLiveUsageParams) {
        await this.onNotReplConnectAndLogin();
        return this.client?.projectGetLiveUsage(args);
    }

    async projectGetHistoryUsage(args: ProjectGetHistoryUsageParams) {
        await this.onNotReplConnectAndLogin();
        return this.client?.projectGetHistoryUsage(args);
    }

    async nodeBrowse(args: NodeBrowseParams) {
        await this.onNotReplConnectAndLogin();
        return this.client?.nodeBrowse(args);
    }

    async nodeCreate(args: NodeCreateParams) {
        await this.onNotReplConnectAndLogin();
        return this.client?.nodeCreate(args);
    }

    async nodeModify(args: NodeModifyParams) {
        await this.onNotReplConnectAndLogin();
        return this.client?.nodeModify(args);
    }

    async nodeDelete(args: NodeDeleteParams) {
        await this.onNotReplConnectAndLogin();
        return this.client?.nodeDelete(args);
    }

    async nodeGetProperties(args: NodeGetPropertiesParams) {
        await this.onNotReplConnectAndLogin();
        return this.client?.nodeGetProperties(args);
    }

    async nodeGetHistory(args: NodeGetHistoryParams) {
        await this.onNotReplConnectAndLogin();
        return this.client?.nodeGetHistory(args);
    }

    async nodeDeleteHistory(args: NodeDeleteHistoryParams) {
        await this.onNotReplConnectAndLogin();
        return this.client?.nodeDeleteHistory(args);
    }

    async permissionNodeSet(args: PermissionNodeSetParams) {
        await this.onNotReplConnectAndLogin();
        return this.client?.permissionNodeSet(args);
    }

    async permissionNodeList(args: PermissionNodeListParams) {
        await this.onNotReplConnectAndLogin();
        return this.client?.permissionNodeList(args);
    }

    async permissionRpcAdd(args: PermissionRpcAddParams) {
        await this.onNotReplConnectAndLogin();
        return this.client?.permissionRpcAdd(args);
    }

    async permissionRpcRemove(args: PermissionRpcRemoveParams) {
        await this.onNotReplConnectAndLogin();
        return this.client?.permissionRpcRemove(args);
    }

    async permissionRpcList(args: PermissionRpcListParams) {
        await this.onNotReplConnectAndLogin();
        return this.client?.permissionRpcList(args);
    }

    async permissionUserList(args: PermissionUserListParams) {
        await this.onNotReplConnectAndLogin();
        return this.client?.permissionUserList(args);
    }

    private async onNotReplConnectAndLogin() {
        if (!this.isRepl() && !this.connected && !this.loggedIn) {
            try {
                await this.connect(this.environment.getConnectParams());
                await this.login(this.environment.getLoginParams());
            }
            catch (e) {
                console.error(e);
                process.exit();
            }
        }
    }

    private addKolibriCommands() {
        this.add(new ConnectCommand().action(async (args: any) => {
            return this.connect(args as any);
        }));
        this.add(new LoginCommand().action(async (args: any) => {
            return this.login(args as any);
        }));
        this.add(new CloseCommand().action(async () => {
            return this.close();
        }));
        this.add(new WriteCommand().action(async (args: any) => {
            return this.write(args);
        }));
        this.add(new ReadCommand().action(async (args: any) => {
            return this.read(args);
        }));
        this.add(new SubscribeCommand().action(async (args: any) => {
            return this.subscribe(args);
        }));
        this.add(new UnsubscribeCommand().action(async (args: any) => {
            return this.unsubscribe(args);
        }));
        this.add(new UserBrowseCommand().action(async (args: any) => {
            return this.userBrowse(args);
        }));
        this.add(new UserCreateCommand().action(async (args: any) => {
            return this.userCreate(args);
        }));
        this.add(new UserDeleteCommand().action(async (args: any) => {
            return this.userDelete(args);
        }));
        this.add(new UserModifyCommand().action(async (args: any) => {
            return this.userModify(args);
        }));
        this.add(new UserGetPropertiesCommand().action(async (args: any) => {
            return this.userGetProperties(args);
        }));
        this.add(new UserSubscribeCommand().action(async (args: any) => {
            return this.userSubscribe(args);
        }));
        this.add(new UserUnsubscribeCommand().action(async (args: any) => {
            return this.userUnsubscribe(args);
        }));
        this.add(new UserGetSessionCommand().action(async (args: any) => {
            return this.userGetSessions(args);
        }));
        this.add(new UserGetHistoryCommand().action(async (args: any) => {
            return this.userGetHistory(args);
        }));
        this.add(new UserGroupBrowseCommand().action(async (args: any) => {
            return this.userGroupBrowse(args);
        }));
        this.add(new UserGroupCreateCommand().action(async (args: any) => {
            return this.userGroupCreate(args);
        }));
        this.add(new UserGroupModifyCommand().action(async (args: any) => {
            return this.userGroupModify(args);
        }));
        this.add(new UserGroupDeleteCommand().action(async (args: any) => {
            return this.userGroupDelete(args);
        }));
        this.add(new UserGroupGetPropertiesCommand().action(async (args: any) => {
            return this.userGroupGetProperties(args);
        }));
        this.add(new UserGroupAddMemberCommand().action(async (args: any) => {
            return this.userGroupAddMember(args);
        }));
        this.add(new UserGroupRemoveMemberCommand().action(async (args: any) => {
            return this.userGroupRemoveMember(args);
        }));
        this.add(new UserGroupListMembersCommand().action(async (args: any) => {
            return this.userGroupListMembers(args);
        }));
        this.add(new UserGroupIsMemberCommand().action(async (args: any) => {
            return this.userGroupIsMember(args);
        }));
        this.add(new ProjectBrowseCommand().action(async (args: any) => {
            return this.projectBrowse(args);
        }));
        this.add(new ProjectCreateCommand().action(async (args: any) => {
            return this.projectCreate(args);
        }));
        this.add(new ProjectModifyCommand().action(async (args: any) => {
            return this.projectModify(args);
        }));
        this.add(new ProjectDeleteCommand().action(async (args: any) => {
            return this.projectDelete(args);
        }));
        this.add(new ProjectGetPropertiesCommand().action(async (args: any) => {
            return this.projectGetProperties(args);
        }));
        this.add(new ProjectGetStatisticsCommand().action(async (args: any) => {
            return this.projectGetStatistics(args);
        }));
        this.add(new ProjectGetLiveUsageCommand().action(async (args: any) => {
            return this.projectGetLiveUsage(args);
        }));
        this.add(new ProjectGetHistoryUsageCommand().action(async (args: any) => {
            return this.projectGetHistoryUsage(args);
        }));
        this.add(new NodeBrowseCommand().action(async (args: any) => {
            return this.nodeBrowse(args);
        }));
        this.add(new NodeCreateCommand().action(async (args: any) => {
            return this.nodeCreate(args);
        }));
        this.add(new NodeModifyCommand().action(async (args: any) => {
            return this.nodeModify(args);
        }));
        this.add(new NodeDeleteCommand().action(async (args: any) => {
            return this.nodeDelete(args);
        }));
        this.add(new NodeGetPropertiesCommand().action(async (args: any) => {
            return this.nodeGetProperties(args);
        }));
        this.add(new NodeGetHistoryCommand().action(async (args: any) => {
            return this.nodeGetHistory(args);
        }));
        this.add(new NodeDeleteHistoryCommand().action(async (args: any) => {
            return this.nodeDeleteHistory(args);
        }));
        this.add(new PermissionNodeSetCommand().action(async (args: any) => {
            return this.permissionNodeSet(args);
        }));
        this.add(new PermissionNodeListCommand().action(async (args: any) => {
            return this.permissionNodeList(args);
        }));
        this.add(new PermissionRpcAddCommand().action(async (args: any) => {
            return this.permissionRpcAdd(args);
        }));
        this.add(new PermissionRpcRemoveCommand().action(async (args: any) => {
            return this.permissionRpcRemove(args);
        }));
        this.add(new PermissionRpcListCommand().action(async (args: any) => {
            return this.permissionRpcList(args);
        }));
        this.add(new PermissionUserListCommand().action(async (args: any) => {
            return this.permissionUserList(args);
        }));
    }
}
