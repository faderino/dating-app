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
