import { Control, FieldErrors } from 'react-hook-form';

export type TUser = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
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
