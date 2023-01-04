export const isEmail = (email: string): boolean =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

export const isEmpty = (value: string | number | null): boolean =>
  !Boolean(value);
