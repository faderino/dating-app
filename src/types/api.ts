export type ResponseAPI<T = any> = {
  status_code: number;
  message: string;
  data: T;
};
