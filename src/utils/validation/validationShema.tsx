import * as yup from 'yup';
import dayjs from 'dayjs';

// Схема валидации с yup
const validationSchema = yup.object({
  user: yup.string().required('Имя пользователя обязательно'),
  gender: yup
    .string()
    .oneOf(['Мужской', 'Женский'], 'Выберите правильный пол') // Указываем возможные значения
    .required('Пол обязателен'),
  role: yup
    .string()
    .oneOf(['Доктор', 'Медбрат', 'Медсестра'], 'Выберите правильную роль') // Указываем возможные значения
    .required('Роль обязательна'),
  birthDate: yup
    .string()
    .required('Дата рождения обязательна')
    .test('age', 'Пользователь должен быть старше 18 лет', (value) => {
      const birthDate = dayjs(value, 'DD-MM-YYYY');
      const age = dayjs().diff(birthDate, 'year');
      return age >= 18;
    })
    .test('valid-date', 'Некорректная дата', (value) =>
      dayjs(value, 'DD-MM-YYYY', true).isValid(),
    ),
});

export default validationSchema;
