import * as yup from 'yup';

export const validationSchemaModal = yup.object().shape({
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
