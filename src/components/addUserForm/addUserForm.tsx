import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, Input, Space, Upload, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { TUser } from 'types/types';
import { RootState, useAppDispatch, useAppSelector } from '@utils/store';
import { closeDrawer } from '@utils/slices/drawerSlice';
import * as yup from 'yup';
import { createUser } from '@utils/api/users';
import { addUser } from '@utils/slices/usersSlice';

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  avatar?: File;
}

interface AddUserFormProps {
  isModal: (sate: boolean) => void;
}

const validationSchema = yup.object().shape({
  first_name: yup.string().required('Введите имя'),
  last_name: yup.string().required('Введите фамилию'),
  email: yup.string().email('Некорректный email').required('Введите email'),
  avatar: yup
    .mixed<File>()
    .test(
      'fileSize',
      'Размер файла должен быть меньше 2 МБ',
      (value) => !value || value.size <= 2 * 1024 * 1024,
    ),
});

export const AddUserForm: React.FC<AddUserFormProps> = ({ isModal }) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state: RootState) => state.users.users);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
      first_name: '',
      last_name: '',
      avatar: undefined,
    },
  });

  const handleFormSubmit = async (data: FormData) => {
    // Преобразуем FormData в TUser
    const newUser: Partial<TUser> = {
      id: Date.now(),
      first_name: data.first_name,
      last_name: data.last_name,
      full_name: `${data.first_name} ${data.last_name}`,
      email: data.email,
      avatar: data.avatar ? URL.createObjectURL(data.avatar) : '',
    };
    console.log(newUser);
    dispatch(addUser(newUser as TUser));
    createUser(newUser.id as number);
    // addUser(newUser as TUser);
    reset(); // Сброс формы
    dispatch(closeDrawer());
    isModal(false);

    Modal.success({
      title: `Пользователь ${newUser.first_name} ${newUser.last_name} успешно создан`,
      onOk: () => {},
    });
  };
  console.log(users);
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
