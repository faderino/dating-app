import { ResponseAPI } from '../types/api';
import client from '../utils/client';

export async function ping(): Promise<any> {
  return client<string>('/ping', {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => {
      console.log(resp);
    })
    .catch((error: ResponseAPI<null>) => {
      console.log(error);
    });
}
