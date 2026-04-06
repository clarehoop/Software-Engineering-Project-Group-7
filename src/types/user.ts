export interface AppUser {
  id: string;
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  email: string;
  phone_num: string;
  is_landlord: Boolean;
  is_admin: Boolean;
  date_created: Date;
  listings: Array<Listing>;
}

export interface Listing {
  id: string;
  landlordId: string;
  address: string;
  city: string;
  country: string;
  state: string;
  status: string;
  type: string;
  apt_num: string;
  description: string;
  lease_terms: string;
  roomates: Number;
  beds: Number;
  baths: Number;
  price: Number;
  createdAt: Date;
  title: string;
}
// export interface Listing {
//   id: string;
//   landlordId: string;
//   address: string;
//   city: string;
//   country: string;
//   state: string;
//   status: string;
//   type: string;
//   apt_num: string;
//   description: string;
//   lease_terms: string;
//   roomates: Number;
//   beds: Number;
//   baths: Number;
//   price: Number;
//   coordinates: GeolocationCoordinates;
// }