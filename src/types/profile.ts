export enum Gender {
  Male = 1,
  Female = 2,
}

export interface Photo {
  photo_id: number;
  profile_id: number;
  upload_id: string;
  image_url: string;
  caption: string;
}

export interface Hobby {
  hobby_id: number;
  title: string;
}

export interface Profile {
  profile_id: number;
  name: string;
  gender: number;
  birthdate: Date;
  location: Location;
  photos: Photo[];
  gold_profile: boolean;
  gold_expiry_date: null | Date;
  height: number;
  weight: number;
  hobbies: Hobby[];
  bio: string;
}
