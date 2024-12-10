export enum EUserType {
  ADMIN = 'admin',
  VENDOR = 'vendor',
  DEFAULT = 'default',
}

export enum EUserStatus {
  OPEN = 'Open',
  CLOSED = 'Closed',
}

export interface IUser {
  _id: string;
  full_name: string;
  email: string;
  hashed_password: string;
  disabled: boolean;
  created_at: string;
  updated_at: string;
  user_type: EUserType;
  status: EUserStatus;
}

export interface IVendorData {
  vendor: IUser;
  total_count: number;
}

export interface IFoodData {
  count: number;
  food_type: string;
  vendor_name: string;
}

export interface UserSettings {
  fullName: string;
  isVendor: boolean;
  isOpen?: boolean;
}
