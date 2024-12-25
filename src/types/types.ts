import { Control, FieldErrors } from 'react-hook-form';

export type TUser = {
  id: number;
  email?: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  avatar?: string;
  gender?: string;
  birthDate?: string;
  role?: string;
};

export type TFormValues = {
  user: string;
  gender: 'Мужской' | 'Женский';
  role: 'Доктор' | 'Медбрат' | 'Медсестра';
  birthDate: string;
};

export type UserFormUIProps = {
  control: Control<TFormValues>;
  errors: FieldErrors<TFormValues>;
  gender: string;
};

export type TUserSelectUiProps = {
  control: Control<TFormValues>;
  errors: FieldErrors<TFormValues>;
  addedUsers: number[];
};

export type TDrawerState = {
  open: boolean;
  title?: string;
  user: TUser | undefined;
};

// export type TGender = 'Мужской' | 'Женский' | undefined;
// export type TRole = 'Доктор' | 'Медбрат' | 'Медсестра' | undefined;
