/* eslint-disable indent */
import { useForm, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import validationSchema from '@utils/validation/validationShema'; // Импортируем схему валидации
import { UserFormUI } from '@ui/userForm/userFormUI';
import { TFormValues, TUser } from 'types/types';
import { Button, Form, Modal, Space } from 'antd';
import { useEffect } from 'react';
import { localupdateUser } from '@utils/api/users';
import { useAppDispatch } from '@utils/store';
import { closeDrawer } from '@utils/slices/drawerSlice';

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
    if (user) {
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
          : undefined,
      );
    }
  }, [user, reset]);

  const gender = watch('gender'); // Отслеживаем значение поля "Пол"
  // Обработчик отправки формы
  const handleFormSubmit = async (data: TFormValues) => {
    console.log(data);
    localupdateUser(data.user as unknown as number);
    reset();
    dispatch(closeDrawer());
    Modal.success({
      title: `Пользователь ${data.user} успешно сохранен`,
      onOk: () => {},
    });
  };

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
