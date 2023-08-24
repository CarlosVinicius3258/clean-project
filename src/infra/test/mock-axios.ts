import { faker } from '@faker-js/faker';
import axios from 'axios';

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.post.mockResolvedValue({
  data: {
    accountName: faker.internet.userName(),
    accountEmail: faker.internet.email(),
    accountPassword: faker.internet.password()
  },
  status: faker.number.int()
  })
  
  return mockedAxios;
}