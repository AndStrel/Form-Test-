import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import validationSchema from '@utils/validation/validationShema'; // Импортируем схему валидации
import { UserFormUI } from '@ui/userForm/userFormUI';
import { TFormValues } from 'types/types';
import { Button, Form } from 'antd';

export const UserForm: React.FC<{ onSubmit: (data: TFormValues) => void }> = ({
  onSubmit,
}) => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<TFormValues>({
    resolver: yupResolver(validationSchema), // Подключаем yupResolver
  });

  const gender = watch('gender'); // Отслеживаем значение поля "Пол"

  const handleFormSubmit = (data: TFormValues) => {
    onSubmit(data);
    reset();
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit(handleFormSubmit)}>
      <UserFormUI control={control} errors={errors} gender={gender} />
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Form.Item>
    </Form>
  );
};
