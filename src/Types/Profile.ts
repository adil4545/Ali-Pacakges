export interface Province {
  stateProvinceCode: number;
  stateProvinceDesc: string;
}
export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  gender: "Male" | "Female" | "Transgender";
  businessName: string;
  ntn: string;
  province?: Province;
  address: string;
  profilePic: string;
}
