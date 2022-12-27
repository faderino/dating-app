import moment from 'moment';

export const getAge = (birthdate: string): number =>
  moment().diff(birthdate, 'years');
