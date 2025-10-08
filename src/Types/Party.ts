import type { Province } from "./Profile";

export interface PartyType {
  partyType: string;
  label: string;
}

export interface Party {
  id?: number;
  ntn: string;
  partyName: string;
  partyType?: PartyType;
  phone?: string;
  cnic?: string;
  strn?: string;
  registrationNo?: string;
  province: Province;
  address: string;
}
