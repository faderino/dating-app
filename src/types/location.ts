export interface City {
  city_id: number;
  name: string;
}

export interface Location {
  city_id: number;
  city: string;
  province_id: number;
  province: string;
  region_id: number;
  region: string;
  country_id: number;
  country: string;
}
