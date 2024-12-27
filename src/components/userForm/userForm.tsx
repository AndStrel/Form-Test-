/* eslint-disable indent */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import validationSchema from '@utils/validation/validationShema'; // Импортируем схему валидации
import { UserFormUI } from '@ui/userForm/userFormUI';
import { TFormValues, TUser } from 'types/types';
import { Button, Form, Modal, Space } from 'antd';
import { useEffect } from 'react';
import { createUser, localupdateUser } from '@utils/api/users';
import { RootState, useAppDispatch, useAppSelector } from '@utils/store';
import { closeDrawer } from '@utils/slices/drawerSlice';
import { addUser, updateUser } from '@utils/slices/usersSlice';

interface UserFormProps {
  user?: TUser;
}

export const UserForm: React.FC<UserFormProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state: RootState) => state.users.users);
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

  const _user = useAppSelector((state) => state.drawer.user);
  const task = useAppSelector((state) => state.drawer.isRedacting);
  const findUserById = (userId: number) =>
    users.find((user) => user.id === userId);

  const handleActionUser = (user: TUser) => {
    const existingUser = findUserById(user.id);
    if (task) {
      dispatch(updateUser(user));
      localupdateUser(user.id as number);
      Modal.success({
        title: `Пользователь ${user.first_name} ${user.last_name} успешно обновлен`,
        onOk: () => {},
      });
    } else if (existingUser) {
      Modal.error({
        title: `Такой пользователь уже существует`,
        onOk: () => {},
      });
      return;
    } else {
      dispatch(addUser(user));
      createUser(user.id);
      Modal.success({
        title: `Пользователь ${user.first_name} ${user.last_name} успешно создан`,
        onOk: () => {},
      });
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

    handleActionUser(newUser as TUser);
    reset();
    dispatch(closeDrawer());
  };

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

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
