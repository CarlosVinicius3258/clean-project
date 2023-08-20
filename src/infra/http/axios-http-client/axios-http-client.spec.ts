import { HttpPostParams } from '@/data/protocols/http';
import { AxiosHttpClient } from './axios-http-client';
import { faker } from '@faker-js/faker';
import axios from 'axios';

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const makeSut = (): AxiosHttpClient => {
  const sut = new AxiosHttpClient()
  return sut
}

const mockPostRequest = (): HttpPostParams<any> => ({  
  url: faker.internet.url(),
  body:{
    accountName: faker.internet.userName(),
    accountEmail: faker.internet.email(),
    accountPassword: faker.internet.password()
  }
})

describe('AxiosHttpClient ', () => {
  test('Should call axios with correct values', async () => {
    const request = mockPostRequest()
    const sut = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  }); 

});