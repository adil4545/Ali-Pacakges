import type { Key } from "react";

export interface Province {
  stateProvinceCode: number;
  stateProvinceDesc: string;
}
export interface UserProfile {
  id?: Key | null | undefined;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string | number | undefined;
  role?: string;
  status?: string;
  gender: "male" | "female" | "other";
  sellerBusinessName: string;
  sellerNTNCNIC?: string;
  sellerProvince?: Province;
  sellerAddress?: string;
  profile_image?: string;
  data?: string;
}
