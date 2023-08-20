import { AxiosHttpClient } from './axios-http-client';
import axios from 'axios';
import { faker } from '@faker-js/faker';
import { HttpPostParams } from '@/data/protocols/http';

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
  test('Should call axios with correct URL and verb', async () => {
    const request = mockPostRequest()
    const url = request.url
    const sut = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(url)
  }); 
  test('Should call axios with correct body', async () => {
    const request = mockPostRequest()
    const url = request.url
    const sut = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(url)
  }); 
});