import moment from 'moment';
import { Gender } from '../types/profile';

export const getAge = (birthdate: string | Date): number =>
  moment().diff(birthdate, 'years');

export const displayDate = (date: string | Date): string =>
  moment(date).format('LL');

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
