import { Control, FieldErrors } from 'react-hook-form';

export interface TUser {
  id: number;
  email?: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  avatar?: string;
  gender?: string;
  birthDate: string;
  role?: string;
}

export type TFormValues = {
  user: string;
  gender: TGender;
  role: TRole;
  birthDate: string;
};

export type FormModalData = {
  first_name: string;
  last_name: string;
  email: string;
  avatar?: File;
};

export type UserFormUIProps = {
  control: Control<TFormValues>;
  errors: FieldErrors<TFormValues>;
  gender: string;
};

export type TUserSelectUiProps = {
  control: Control<TFormValues>;
  errors: FieldErrors<TFormValues>;
};

export type TDrawerState = {
  open: boolean;
  isRedacting: boolean;
  user?: TUser;
};

export type TGender = 'Мужской' | 'Женский';
export type TRole = 'Доктор' | 'Медбрат' | 'Медсестра';
