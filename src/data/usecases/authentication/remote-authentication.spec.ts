import { HttpPostClientSpy } from '@/data/test';
import { HttpStatusCode } from '@/data/protocols/http';
import { mockAccountModel, mockAuthentication } from '@/domain/test';
import { InvalidCredentialsError,UnexpectedError } from '@/domain/errors';
import { AuthenticationParams } from '@/domain/usecases';
import { AccountModel } from '@/domain/models';
import { RemoteAuthentication } from './remote-authentication';
import { faker } from '@faker-js/faker';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AuthenticationParams, AccountModel>();
  const sut = new RemoteAuthentication(url, httpPostClientSpy); // sut = system under test
  return {
    sut,
    httpPostClientSpy,
  };
};
describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url();
    const { httpPostClientSpy, sut } = makeSut(url);

    await sut.auth(mockAuthentication());
    expect(httpPostClientSpy.url).toBe(url);
  });

  test('Should call HttpPostClient with correct body', async () => {
    const { httpPostClientSpy, sut } = makeSut();
    const authenticationParams = mockAuthentication();
    await sut.auth(authenticationParams);
    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });
  test('Should throw InvalidCredentialError if HttpPostClient return 401', async () => {
    const { httpPostClientSpy, sut } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    const authenticationParams = mockAuthentication();
    const promise = sut.auth(authenticationParams);
    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });
  test('Should throw UnexpectedError if HttpPostClient return 400', async () => {
    const { httpPostClientSpy, sut } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const authenticationParams = mockAuthentication();
    const promise = sut.auth(authenticationParams);
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
  test('Should throw UnexpectedError if HttpPostClient return 500', async () => {
    const { httpPostClientSpy, sut } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const authenticationParams = mockAuthentication();
    const promise = sut.auth(authenticationParams);
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
  test('Should throw UnexpectedError if HttpPostClient return 404', async () => {
    const { httpPostClientSpy, sut } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const authenticationParams = mockAuthentication();
    const promise = sut.auth(authenticationParams);
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
  test('Should return AccountModel if HttpPostClient return 200', async () => {
    const { httpPostClientSpy, sut } = makeSut();
    const httpResult = mockAccountModel();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const authenticationParams = mockAuthentication();
    const account = await sut.auth(authenticationParams);
    await expect(account).toBe(httpResult)
  });
});
