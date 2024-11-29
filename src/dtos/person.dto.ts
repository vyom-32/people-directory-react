export interface EmailDto {
  id: number;
  email: string;
  emailType: string;
  personId: number;
  createdAt: string;
  updatedAt: string;
}

export interface MobileDto {
  id: number;
  mobileType: string;
  mobile: string;
  personId: number;
  createdAt: string;
  updatedAt: string;
}

export interface AddressDto {
  id: number;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  addressType: string;
  personId: number;
  createdAt: string;
  updatedAt: string;
}

export interface PersonDto {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  dob: string;
  gender: string;
  updatedAt: string;
  createdAt: string;
  emails: EmailDto[];
  mobiles: MobileDto[];
  addresses: AddressDto[];
}
