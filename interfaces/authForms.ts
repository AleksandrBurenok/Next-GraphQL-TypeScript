import {
  LoginForm as LoginFormK,
  RegisterForm as RegisterFormK,
  ForgotForm as ForgotFormK,
  ResetForm as ResetFormK,
} from 'enums/authForms';

export interface LoginForm {
  [LoginFormK.username]: string;
  [LoginFormK.password]: string;
}

export interface RegisterForm {
  [RegisterFormK.username]: string;
  [RegisterFormK.password]: string;
  [RegisterFormK.phone]: string;
  [RegisterFormK.email]: string;
}

export interface ForgotForm {
  [ForgotFormK.email]: string;
}

export interface ResetForm {
  [ResetFormK.password]: string;
  [ResetFormK.passwordConfirm]: string;
  [ResetFormK.email]: string;
  [ResetFormK.code]: string;
}
