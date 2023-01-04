import moment from 'moment';
import { Gender } from '../types/profile';

export const getAge = (birthdate: string | Date): number =>
  moment().diff(birthdate, 'years');

export const displayDate = (date: string | Date): string =>
  moment(date).format('LL');

export const getFirstName = (name: string): string => name.split(' ')[0];

export const displayGender = (gender?: Gender): string => {
  if (gender === Gender.Male) {
    return 'Man';
  }
  if (gender === Gender.Female) {
    return 'Woman';
  }
  return 'N/A';
};

export const displayPreference = (gender?: Gender): string => {
  if (gender === Gender.Male) {
    return 'Woman';
  }
  if (gender === Gender.Female) {
    return 'Man';
  }
  return 'N/A';
};

export const compactCurrency = (number: number): string => {
  return Intl.NumberFormat('en', { notation: 'compact' }).format(number);
};

export const formatCurrency: (number?: number) => string = (number = 0) => {
  return new Intl.NumberFormat('id-ID').format(+number.toFixed(2));
};
