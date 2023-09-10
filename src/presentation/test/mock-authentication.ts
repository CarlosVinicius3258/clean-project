import { AccountModel } from '@/domain/models';
import { mockAccountModel } from '@/domain/test';
import { Authentication, AuthenticationParams } from '@/domain/usecases';

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel();
  params: AuthenticationParams;
  private callsCounts: number = 0;

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params;
    this.callsCounts++;
    return Promise.resolve(this.account);
  }

  get callsCount(): number {
    return this.callsCounts;
  }
}