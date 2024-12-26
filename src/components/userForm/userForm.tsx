/* eslint-disable indent */
import { useForm, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import validationSchema from '@utils/validation/validationShema'; // Импортируем схему валидации
import { UserFormUI } from '@ui/userForm/userFormUI';
import { TFormValues, TUser } from 'types/types';
import { Button, Form, Modal, Space } from 'antd';
import { useEffect } from 'react';
import { localupdateUser } from '@utils/api/users';
import { useAppDispatch, useAppSelector } from '@utils/store';
import { closeDrawer } from '@utils/slices/drawerSlice';
import { addUser, updateUser } from '@utils/slices/usersSlice';
import _, { update } from 'lodash';

interface UserFormProps {
  user?: TUser;
}

export const UserForm: React.FC<UserFormProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<TFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: user
      ? {
          user: user.full_name,
          gender:
            user.gender === 'Мужской' || user.gender === 'Женский'
              ? user.gender
              : undefined,
          role:
            user.role === 'Доктор' ||
            user.role === 'Медбрат' ||
            user.role === 'Медсестра'
              ? user.role
              : undefined,
          birthDate: user.birthDate,
        }
      : undefined,
  });

  // Сброс значений формы при изменении user
  useEffect(() => {
    reset(
      user
        ? {
            user: user.full_name,
            gender:
              user.gender === 'Мужской' || user.gender === 'Женский'
                ? user.gender
                : undefined,
            role:
              user.role === 'Доктор' ||
              user.role === 'Медбрат' ||
              user.role === 'Медсестра'
                ? user.role
                : undefined,
            birthDate: user.birthDate,
          }
        : {
            user: undefined,
            gender: undefined,
            role: undefined,
            birthDate: '',
          }, // Сбрасываем на пустые значения
    );
  }, [user, reset]);

  const gender = watch('gender'); // Отслеживаем значение поля "Пол"
  // Обработчик отправки формы
  const _user = useAppSelector((state) => state.drawer.user);
  const task = useAppSelector((state) => state.drawer.isRedacting);

  const handleAction = (user: TUser) => {
    if (task) {
      dispatch(updateUser(user));
    } else {
      dispatch(addUser(user));
    }
  };
  const handleFormSubmit = async (data: TFormValues) => {
    // Преобразуем FormData в TUser
    const newUser: Partial<TUser> = {
      id: _user?.id,
      email: _user?.email,
      first_name: _user?.first_name,
      last_name: _user?.last_name,
      full_name: `${_user?.first_name} ${_user?.last_name}`,
      gender: data.gender,
      role: data.role,
      birthDate: data.birthDate,
      avatar: _user?.avatar,
    };
    // dispatch(addUser(newUser as TUser));
    handleAction(newUser as TUser);

    localupdateUser(newUser.id as number);
    reset();
    dispatch(closeDrawer());
    Modal.success({
      title: `Успешно 👍`,
      onOk: () => {},
    });
  };
  const usersState = useAppSelector((state) => state.users);
  console.log(usersState);
  return (
    <Form layout="vertical" onFinish={handleSubmit(handleFormSubmit)}>
      <UserFormUI control={control} errors={errors} gender={gender} />
      <Form.Item>
        <Space style={{ marginTop: 16 }}>
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
          <Button htmlType="reset" onClick={() => reset()}>
            Отменить
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
