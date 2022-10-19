import { Environment } from '../src/environment';
import { KolibriCli } from '../src/kolibri-cli';
import { KolibriClient, KolibriClientFactory } from '@hms-networks/kolibri-js-client';

jest.mock('@hms-networks/kolibri-js-client');
jest.mock('../src/environment');

const EnvironmentMock = Environment as jest.MockedClass<typeof Environment>;
const KolibriClientMock = KolibriClient as jest.MockedClass<typeof KolibriClient>;
const KolibriClientFactoryMock = KolibriClientFactory as jest.MockedClass<typeof KolibriClientFactory>;

// Disable KOLIBRI_CLI_FORCE_RAW if it set
process.env['KOLIBRI_CLI_FORCE_RAW'] = '0';

describe('KolibriCli', () => {
    const env: any = new EnvironmentMock();
    const kolibriClientMock: any = new KolibriClientMock({} as any);
    KolibriClientFactoryMock.create = jest.fn().mockReturnValue(kolibriClientMock);
    const cli = new KolibriCli(env);

    describe('connected', () => {
        it('should be called', async () => {
            cli.connect({ host: 'ws://localhost:8080', project: 'management', path: '/' });
            expect(kolibriClientMock.connect).toHaveBeenCalled();
        });
    });

    describe('login', () => {
        it('should be called and logged in', async () => {
            cli.connect({ host: 'ws://localhost:8080', project: 'management', path: '/' });
            cli.login({} as any);
            expect(kolibriClientMock.login).toHaveBeenCalled();
        });
    });

    describe('subscribe', () => {
        it('should be called and return correct value', async () => {
            const response: any = {};
            kolibriClientMock.subscribe.mockResolvedValue(response);
            const result = await cli.subscribe({} as any);
            expect(kolibriClientMock.subscribe).toHaveBeenCalled();
            expect(result).toEqual(response);
        });
    });

    describe('close', () => {
        it('should be called and return correct value', async () => {
            const response: number = 0;
            kolibriClientMock.close.mockResolvedValue(response);
            const result = await cli.close();
            expect(kolibriClientMock.close).toHaveBeenCalled();
            expect(result).toEqual(response);
        });
    });

    describe('userBrowse', () => {
        it('should be called and return correct value', async () => {
            const response: any = {};
            kolibriClientMock.userBrowse.mockResolvedValue(response);
            const result = await cli.userBrowse({} as any);
            expect(kolibriClientMock.userBrowse).toHaveBeenCalled();
            expect(result).toEqual(response);
        });
    });

    describe('userCreate', () => {
        it('should be called and return correct value', async () => {
            const response: number = 0;
            kolibriClientMock.userCreate.mockResolvedValue(response);
            const result = await cli.userCreate({} as any);
            expect(kolibriClientMock.userCreate).toHaveBeenCalled();
            expect(result).toEqual(response);
        });
    });

    describe('userDelete', () => {
        it('should be called and return correct value', async () => {
            const response: number = 0;
            kolibriClientMock.userDelete.mockResolvedValue(response);
            const result = await cli.userDelete({} as any);
            expect(kolibriClientMock.userDelete).toHaveBeenCalled();
            expect(result).toEqual(response);
        });
    });

    describe('userModify', () => {
        it('should be called and return correct value', async () => {
            const response: number = 0;
            kolibriClientMock.userModify.mockResolvedValue(response);
            const result = await cli.userModify({} as any);
            expect(kolibriClientMock.userModify).toHaveBeenCalled();
            expect(result).toEqual(response);
        });
    });

    describe('userGetProperties', () => {
        it('should be called and return correct value', async () => {
            const response: any = {};
            kolibriClientMock.userGetProperties.mockResolvedValue(response);
            const result = await cli.userGetProperties({} as any);
            expect(kolibriClientMock.userGetProperties).toHaveBeenCalled();
            expect(result).toEqual(response);
        });
    });

    describe('userGetSessions', () => {
        it('should be called and return correct value', async () => {
            const response: any = {};
            kolibriClientMock.userGetSessions.mockResolvedValue(response);
            const result = await cli.userGetSessions({} as any);
            expect(kolibriClientMock.userGetSessions).toHaveBeenCalled();
            expect(result).toEqual(response);
        });
    });

    describe('userGetHistory', () => {
        it('should be called and return correct value', async () => {
            const response: any = {};
            kolibriClientMock.userGetHistory.mockResolvedValue(response);
            const result = await cli.userGetHistory({} as any);
            expect(kolibriClientMock.userGetHistory).toHaveBeenCalled();
            expect(result).toEqual(response);
        });
    });

    describe('userGroupBrowse', () => {
        it('should be called and return correct value', async () => {
            const response: any = {};
            kolibriClientMock.userGroupBrowse.mockResolvedValue(response);
            const result = await cli.userGroupBrowse({} as any);
            expect(kolibriClientMock.userGroupBrowse).toHaveBeenCalled();
            expect(result).toEqual(response);
        });
    });

    describe('userGroupCreate', () => {
        it('should be called and return correct value', async () => {
            const response: number = 0;
            kolibriClientMock.userGroupCreate.mockResolvedValue(response);
            const result = await cli.userGroupCreate({} as any);
            expect(kolibriClientMock.userGroupCreate).toHaveBeenCalled();
            expect(result).toEqual(response);
        });
    });

    describe('userGroupModify', () => {
        it('should be called and return correct value', async () => {
            const response: number = 0;
            kolibriClientMock.userGroupModify.mockResolvedValue(response);
            const result = await cli.userGroupModify({} as any);
            expect(kolibriClientMock.userGroupModify).toHaveBeenCalled();
            expect(result).toEqual(response);
        });
    });

    describe('userGroupDelete', () => {
        it('should be called and return correct value', async () => {
            const response: number = 0;
            kolibriClientMock.userGroupDelete.mockResolvedValue(response);
            const result = await cli.userGroupDelete({} as any);
            expect(kolibriClientMock.userGroupDelete).toHaveBeenCalled();
            expect(result).toEqual(response);
        });
    });

    describe('userGroupGetProperties', () => {
        it('should be called and return correct value', async () => {
            const response: any = {};
            kolibriClientMock.userGroupGetProperties.mockResolvedValue(response);
            const result = await cli.userGroupGetProperties({} as any);
            expect(kolibriClientMock.userGroupGetProperties).toHaveBeenCalled();
            expect(result).toEqual(response);
        });
    });

    describe('userGroupAddMember', () => {
        it('should be called and return correct value', async () => {
            const response: number = 0;
            kolibriClientMock.userGroupAddMember.mockResolvedValue(response);
            const result = await cli.userGroupAddMember({} as any);
            expect(kolibriClientMock.userGroupAddMember).toHaveBeenCalled();
            expect(result).toEqual(response);
        });
    });

    describe('userGroupRemoveMember', () => {
        it('should be called and return correct value', async () => {
            const response: number = 0;
            kolibriClientMock.userGroupRemoveMember.mockResolvedValue(response);
            const result = await cli.userGroupRemoveMember({} as any);
            expect(kolibriClientMock.userGroupRemoveMember).toHaveBeenCalled();
            expect(result).toEqual(response);
        });
    });

    describe('userGroupListMembers', () => {
        it('should be called and return correct value', async () => {
            const response: string[] = [''];
            kolibriClientMock.userGroupListMembers.mockResolvedValue(response);
            const result = await cli.userGroupListMembers({} as any);
            expect(kolibriClientMock.userGroupListMembers).toHaveBeenCalled();
            expect(result).toEqual(response);
        });
    });

    describe('userGroupIsMember', () => {
        it('should be called and return correct value', async () => {
            const response: boolean = false;
            kolibriClientMock.userGroupIsMember.mockResolvedValue(response);
            const result = await cli.userGroupIsMember({} as any);
            expect(kolibriClientMock.userGroupIsMember).toHaveBeenCalled();
            expect(result).toEqual(response);
        });
    });

    describe('projectBrowse', () => {
        it('should be called and return correct value', async () => {
            const response: any = {};
            kolibriClientMock.projectBrowse.mockResolvedValue(response);
            const result = await cli.projectBrowse({} as any);
            expect(kolibriClientMock.projectBrowse).toHaveBeenCalled();
            expect(result).toEqual(response);
        });
    });

    describe('projectCreate', () => {
        it('should be called and return correct value', async () => {
            const response: any = {};
            kolibriClientMock.projectCreate.mockResolvedValue(response);
            const result = await cli.projectCreate({} as any);
            expect(kolibriClientMock.projectCreate).toHaveBeenCalled();
            expect(result).toEqual(response);
        });
    });

    describe('projectModify', () => {
        it('should be called and return correct value', async () => {
            const response: number = 0;
            kolibriClientMock.projectModify.mockResolvedValue(response);
            const result = await cli.projectModify({} as any);
            expect(kolibriClientMock.projectModify).toHaveBeenCalled();
            expect(result).toEqual(response);
        });
    });

    describe('projectDelete', () => {
        it('should be called and return correct value', async () => {
            const response: number = 0;
            kolibriClientMock.projectDelete.mockResolvedValue(response);
            const result = await cli.projectDelete({} as any);
            expect(kolibriClientMock.projectDelete).toHaveBeenCalled();
            expect(result).toEqual(response);
        });
    });

    describe('projectGetProperties', () => {
        it('should be called and return correct value', async () => {
            const response: any = {};
            kolibriClientMock.projectGetProperties.mockResolvedValue(response);
            const result = await cli.projectGetProperties({} as any);
            expect(kolibriClientMock.projectGetProperties).toHaveBeenCalled();
            expect(result).toEqual(response);
        });
    });

    describe('projectGetStatistics', () => {
        it('should be called and return correct value', async () => {
            const response: any = {};
            kolibriClientMock.projectGetStatistics.mockResolvedValue(response);
            const result = await cli.projectGetStatistics({} as any);
            expect(kolibriClientMock.projectGetStatistics).toHaveBeenCalled();
            expect(result).toEqual(response);
        });
    });

    describe('projectGetLiveUsage', () => {
        it('should be called and return correct value', async () => {
            const response: any = {};
            kolibriClientMock.projectGetLiveUsage.mockResolvedValue(response);
            const result = await cli.projectGetLiveUsage({} as any);
            expect(kolibriClientMock.projectGetLiveUsage).toHaveBeenCalled();
            expect(result).toEqual(response);
        });
    });

    describe('projectGetHistoryUsage', () => {
        it('should be called and return correct value', async () => {
            const response: any = {};
            kolibriClientMock.projectGetHistoryUsage.mockResolvedValue(response);
            const result = await cli.projectGetHistoryUsage({} as any);
            expect(kolibriClientMock.projectGetHistoryUsage).toHaveBeenCalled();
            expect(result).toEqual(response);
        });
    });

    describe('nodeBrowse', () => {
        it('should be called and return correct value', async () => {
            const response: any = {};
            kolibriClientMock.nodeBrowse.mockResolvedValue(response);
            const result = await cli.nodeBrowse({} as any);
            expect(kolibriClientMock.nodeBrowse).toHaveBeenCalled();
            expect(result).toEqual(response);
        });
    });

    describe('nodeCreate', () => {
        it('should be called and return correct value', async () => {
            const response: number = 0;
            kolibriClientMock.nodeCreate.mockResolvedValue(response);
            const result = await cli.nodeCreate({} as any);
            expect(kolibriClientMock.nodeCreate).toHaveBeenCalled();
            expect(result).toEqual(response);
        });
    });

    describe('nodeModify', () => {
        it('should be called and return correct value', async () => {
            const response: number = 0;
            kolibriClientMock.nodeModify.mockResolvedValue(response);
            const result = await cli.nodeModify({} as any);
            expect(kolibriClientMock.nodeModify).toHaveBeenCalled();
            expect(result).toEqual(response);
        });
    });

    describe('nodeDelete', () => {
        it('should be called and return correct value', async () => {
            const response: number = 0;
            kolibriClientMock.nodeDelete.mockResolvedValue(response);
            const result = await cli.nodeDelete({} as any);
            expect(kolibriClientMock.nodeDelete).toHaveBeenCalled();
            expect(result).toEqual(response);
        });
    });

    describe('nodeGetProperties', () => {
        it('should be called and return correct value', async () => {
            const response: any = {};
            kolibriClientMock.nodeGetProperties.mockResolvedValue(response);
            const result = await cli.nodeGetProperties({} as any);
            expect(kolibriClientMock.nodeGetProperties).toHaveBeenCalled();
            expect(result).toEqual(response);
        });
    });

    describe('nodeGetHistory', () => {
        it('should be called and return correct value', async () => {
            const response: any = {};
            kolibriClientMock.nodeGetHistory.mockResolvedValue(response);
            const result = await cli.nodeGetHistory({} as any);
            expect(kolibriClientMock.nodeGetHistory).toHaveBeenCalled();
            expect(result).toEqual(response);
        });
    });

    describe('nodeDeleteHistory', () => {
        it('should be called and return correct value', async () => {
            const response: number = 0;
            kolibriClientMock.nodeDeleteHistory.mockResolvedValue(response);
            const result = await cli.nodeDeleteHistory({} as any);
            expect(kolibriClientMock.nodeDeleteHistory).toHaveBeenCalled();
            expect(result).toEqual(response);
        });
    });

    describe('permissionNodeSet', () => {
        it('should be called and return correct value', async () => {
            const response: number = 0;
            kolibriClientMock.permissionNodeSet.mockResolvedValue(response);
            const result = await cli.permissionNodeSet({} as any);
            expect(kolibriClientMock.permissionNodeSet).toHaveBeenCalled();
            expect(result).toEqual(response);
        });
    });

    describe('permissionNodeList', () => {
        it('should be called and return correct value', async () => {
            const response: any = {};
            kolibriClientMock.permissionNodeList.mockResolvedValue(response);
            const result = await cli.permissionNodeList({} as any);
            expect(kolibriClientMock.permissionNodeList).toHaveBeenCalled();
            expect(result).toEqual(response);
        });
    });

    describe('permissionRpcAdd', () => {
        it('should be called and return correct value', async () => {
            const response: number = 0;
            kolibriClientMock.permissionRpcAdd.mockResolvedValue(response);
            const result = await cli.permissionRpcAdd({} as any);
            expect(kolibriClientMock.permissionRpcAdd).toHaveBeenCalled();
            expect(result).toEqual(response);
        });
    });

    describe('permissionRpcRemove', () => {
        it('should be called and return correct value', async () => {
            const response: number = 0;
            kolibriClientMock.permissionRpcRemove.mockResolvedValue(response);
            const result = await cli.permissionRpcRemove({} as any);
            expect(kolibriClientMock.permissionRpcRemove).toHaveBeenCalled();
            expect(result).toEqual(response);
        });
    });

    describe('permissionRpcList', () => {
        it('should be called and return correct value', async () => {
            const response: any = {};
            kolibriClientMock.permissionRpcList.mockResolvedValue(response);
            const result = await cli.permissionRpcList({} as any);
            expect(kolibriClientMock.permissionRpcList).toHaveBeenCalled();
            expect(result).toEqual(response);
        });
    });

    describe('permissionUserList', () => {
        it('should be called and return correct value', async () => {
            const response: any = {};
            kolibriClientMock.permissionUserList.mockResolvedValue(response);
            const result = await cli.permissionUserList({} as any);
            expect(kolibriClientMock.permissionUserList).toHaveBeenCalled();
            expect(result).toEqual(response);
        });
    });

    describe('permissionUserList with KOLIBRI_CLI_FORCE_RAW set to 1', () => {
        it('should be called and return correct value', async () => {
            process.env['KOLIBRI_CLI_FORCE_RAW'] = '1';
            const response: any = {};
            kolibriClientMock.permissionUserList.mockResolvedValue(response);
            const result = await cli.permissionUserList({} as any);
            expect(kolibriClientMock.permissionUserList).toHaveBeenCalled();
            expect(result).toEqual('{}');
            process.env['KOLIBRI_CLI_FORCE_RAW'] = '0';
        });
    });
});
