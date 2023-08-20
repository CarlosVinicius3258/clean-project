import { HttpPostClientSpy } from '@/data/test/mock-http-client';
import { HttpStatusCode } from '@/data/protocols/http/httpResponse';
import { RemoteAuthentication } from './remote-authentication';
import { mockAuthentication } from '@/domain/test/mock-authentication';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { faker } from '@faker-js/faker';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy();
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
});
