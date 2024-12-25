import { useForm, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import validationSchema from '@utils/validation/validationShema'; // Импортируем схему валидации
import { UserFormUI } from '@ui/userForm/userFormUI';
import { TFormValues } from 'types/types';
import { Button, Form, Space } from 'antd';

export const UserForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<TFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: {}, // Инициализируем пустыми значениями
  });

  const gender = watch('gender'); // Отслеживаем значение поля "Пол"

  // Обработчик отправки формы
  const handleFormSubmit = (data: TFormValues) => {
    reset();
    console.log(data);
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
