export interface IUserInfo {
  id: number;
  username: string;
  nicename: string;
  has_affiliate: boolean;
  email: string;
  url: string;
  registered: string;
  password_asterisk: string;
  credit_store: number;
  displayname: string;
  firstname: string;
  lastname: string;
  nickname: string;
  description: string;
  capabilities: string;
  avatar: any;
  is_default_password: boolean;
}

export interface LoggedUserData {
  cookie: string;
  cookie_admin: string;
  cookie_name: string;
  cookie_expiration: string;
  user: IUserInfo;
}

export interface RegisteredUser {
  email: string;
  username: string;
  password?: string;
}

export interface IRegUserInfo extends IUserInfo {
  registration_cookie: string;
}

export type VICTier = {
  name: string;
  threshold: number;
  discount: number;
  to_reach?: number;
};

export type UserVICData = {
  user_id: number;
  total_spent: number;
  total_completed_orders: number;
  current_tier: VICTier | null;
  next_tier: VICTier | null;
};

export type SpecificUser = {
  is_tirz_user: boolean;
  is_syringe_user: boolean;
  is_paypal_user: boolean;
  is_abaka_user: boolean;
  is_stripe_user: boolean;
};
