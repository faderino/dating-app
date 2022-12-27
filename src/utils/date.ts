import moment from 'moment';

export const getAge = (birthdate: string | Date): number =>
  moment().diff(birthdate, 'years');
