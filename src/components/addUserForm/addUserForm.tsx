import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, Input, Space, Upload, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { TUser, FormModalData } from 'types/types';
import { RootState, useAppDispatch, useAppSelector } from '@utils/store';
import { closeDrawer } from '@utils/slices/drawerSlice';
import { createUser } from '@utils/api/users';
import { addUser } from '@utils/slices/usersSlice';
import { validationSchemaModal } from '@utils/validation/validationShemaModal';
import { useEffect } from 'react';

interface AddUserFormProps {
  isModal: (sate: boolean) => void;
}

export const AddUserForm: React.FC<AddUserFormProps> = ({ isModal }) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state: RootState) => state.users.users);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormModalData>({
    resolver: yupResolver(validationSchemaModal),
    defaultValues: {
      email: '',
      first_name: '',
      last_name: '',
      avatar: undefined,
    },
  });

  const handleFormSubmit = async (data: FormModalData) => {
    const newUser: Partial<TUser> = {
      id: Date.now(),
      first_name: data.first_name,
      last_name: data.last_name,
      full_name: `${data.first_name} ${data.last_name}`,
      email: data.email,
      avatar: data.avatar ? URL.createObjectURL(data.avatar) : '',
    };
    dispatch(addUser(newUser as TUser));
    createUser(newUser.id as number);
    reset();
    dispatch(closeDrawer());
    isModal(false);

    Modal.success({
      title: `Пользователь ${newUser.first_name} ${newUser.last_name} успешно создан`,
      onOk: () => {},
    });
  };

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  return (
    <Form layout="vertical" onFinish={handleSubmit(handleFormSubmit)}>
      <Form.Item
        required
        label="Имя"
        validateStatus={errors.first_name ? 'error' : undefined}
        help={errors.first_name?.message}
      >
        <Controller
          name="first_name"
          control={control}
          render={({ field }) => <Input placeholder="Введите имя" {...field} />}
        />
      </Form.Item>
      <Form.Item
        required
        label="Фамилия"
        validateStatus={errors.last_name ? 'error' : undefined}
        help={errors.last_name?.message}
      >
        <Controller
          name="last_name"
          control={control}
          render={({ field }) => (
            <Input placeholder="Введите фамилию" {...field} />
          )}
        />
      </Form.Item>
      <Form.Item
        required
        label="Email"
        validateStatus={errors.email ? 'error' : undefined}
        help={errors.email?.message}
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input placeholder="Введите email" {...field} />
          )}
        />
      </Form.Item>
      <Form.Item
        label="Аватар"
        validateStatus={errors.avatar ? 'error' : undefined}
        help={errors.avatar?.message}
      >
        <Controller
          name="avatar"
          control={control}
          render={({ field }) => (
            <Upload
              beforeUpload={(file) => {
                field.onChange(file);
                return false;
              }}
              accept="image/*"
              maxCount={1}
              showUploadList={true}
            >
              <Button icon={<UploadOutlined />}>Загрузить аватар</Button>
            </Upload>
          )}
        />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
          <Button
            htmlType="reset"
            onClick={() =>
              reset({
                email: '',
                first_name: '',
                last_name: '',
                avatar: undefined,
              })
            }
          >
            Отменить
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
