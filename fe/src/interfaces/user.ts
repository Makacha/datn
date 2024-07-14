export interface IUserInfo {
  username: string
  fullName: string
  email: string
  phone: string
  role: string
}

export interface ILoginForm {
  username: string;
  password: string;
  remember: boolean;
}

export interface ISignUpForm {
  username: string;
  fullName: string;
  password: string;
  email: string;
  phoneNumber: string;
}

export interface ILoginResponse {
  token: string;
}

export interface IUserContext {
  userInfo: IUserInfo | null;
}
