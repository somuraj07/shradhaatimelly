import { IconType } from "react-icons";

export interface IMenuItem {
  label: string;
  href: string;
  icon: IconType; 
}


type SchoolFormState = {
  schoolName: string;
  password: string;
  phone: string;
  email: string;
  classRange: string;
  board: string;
  addressLine: string;
  pincode: string;
  area: string;
  city: string;
  district: string;
  state: string;
};
export type { SchoolFormState };


