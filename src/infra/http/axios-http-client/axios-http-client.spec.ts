import { mockPostRequest } from '@/domain/test';
import { mockAxios } from '@/infra/test';
import { AxiosHttpClient } from './axios-http-client';

import axios from 'axios';

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient,
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()
  return {
    sut,
    mockedAxios
  }
}



describe('AxiosHttpClient ', () => {
  test('Should call axios with correct values', async () => {
    const {mockedAxios, sut} = makeSut()
    const request = mockPostRequest()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  }); 
  test('Should return the correct statysCode and body', () => {
        const {mockedAxios, sut} = makeSut()

    const httpResponse = sut.post(mockPostRequest())
    const mockedAxiosResult = mockedAxios.post.mock.results[0].value
    expect(httpResponse).toEqual(mockedAxiosResult)
  }); 

});