import { DatePicker, Input, Select } from 'antd';
import dayjs from 'dayjs';
import { Controller } from 'react-hook-form';
import { UserFormUIProps } from 'types/types';
import { Form, Typography } from 'antd';

const { Option } = Select;
const { Text } = Typography;

export const UserFormUI: React.FC<UserFormUIProps> = ({
  control,
  errors,
  gender,
}) => (
  <>
    <Form.Item
      label="Имя пользователя"
      required
      help={errors.user && <Text type="danger">{errors.user.message}</Text>}
    >
      <Controller
        name="user"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input {...field} placeholder="Введите имя пользователя" />
        )}
      />
    </Form.Item>

    <Form.Item
      label="Пол"
      required
      help={errors.gender && <Text type="danger">{errors.gender.message}</Text>}
    >
      <Controller
        name="gender"
        control={control}
        defaultValue={undefined}
        render={({ field }) => (
          <Select {...field} placeholder="Выберите пол">
            <Option value="Мужской">Мужской</Option>
            <Option value="Женский">Женский</Option>
          </Select>
        )}
      />
    </Form.Item>

    <Form.Item
      label="Роль"
      required
      help={errors.role && <Text type="danger">{errors.role.message}</Text>}
    >
      <Controller
        name="role"
        control={control}
        defaultValue={undefined}
        render={({ field }) => (
          <Select {...field} placeholder="Выберите роль">
            <Option value="Доктор">Доктор</Option>
            {!gender && (
              <>
                <Option value="Медсестра">Медсестра</Option>
                <Option value="Медбрат">Медбрат</Option>
              </>
            )}
            {gender === 'Мужской' && <Option value="Медбрат">Медбрат</Option>}
            {gender === 'Женский' && (
              <Option value="Медсестра">Медсестра</Option>
            )}
          </Select>
        )}
      />
    </Form.Item>

    <Form.Item
      label="Дата рождения"
      required
      help={
        errors.birthDate && (
          <Text type="danger">{errors.birthDate.message}</Text>
        )
      }
    >
      <Controller
        name="birthDate"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <DatePicker
            {...field}
            format="DD-MM-YYYY"
            placeholder="Выберите дату рождения"
            value={field.value ? dayjs(field.value, 'DD-MM-YYYY') : undefined}
            onChange={(date, dateString) => field.onChange(dateString)}
          />
        )}
      />
    </Form.Item>
  </>
);
