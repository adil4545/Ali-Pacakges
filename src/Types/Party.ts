export interface Province {
  stateProvinceCode: number;
  stateProvinceDesc: string;
}

export interface PartyType {
  partyType: string;
  label: string;
}

export interface Party {
  id?: number;
  ntn: string;
  party_name: string;
  party_type?: PartyType | string;
  phone?: string;
  cnic?: string;
  strn?: string;
  registration_type?: "Registered" | "unregistered" | "Unregistered";
  province: Province;
  address: string;
}
