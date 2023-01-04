import axios, {
  AxiosError,
  AxiosRequestConfig,
  RawAxiosRequestHeaders,
} from 'axios';
import { ResponseAPI } from '../types/api';
import { HttpStatusCode } from '../types/httpStatus';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

type ClientConfig = {
  body?: any;
  token?: string;
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  headers?: RawAxiosRequestHeaders;
};

type ClientFn = <T = any>(
  endpoint: string,
  clientConfig?: ClientConfig,
) => Promise<ResponseAPI<T>>;

const client: ClientFn = async (
  endpoint,
  { body: data, ...customConfig } = {},
) => {
  const headers = {} as RawAxiosRequestHeaders;

  if (customConfig.token) {
    headers.Authorization = `Bearer ${customConfig.token}`;
  }

  const config: AxiosRequestConfig = {
    url: endpoint,
    method: data ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  return axiosClient(config)
    .then((resp) => resp.data)
    .catch((error: AxiosError) => {
      if (error.response?.status === HttpStatusCode.Unauthorized) {
        window.location.reload();
      }
      return Promise.reject(error.response?.data as ResponseAPI<null>);
    });
};

export default client;
