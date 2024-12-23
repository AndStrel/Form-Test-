import formReducer, { setFormValues, updateFormField } from '../utils/slices/formSlice'; // Импортируем редьюсер и экшены
import { TFormValues } from 'types/types'; // Импортируем типы

describe('formSlice', () => {
  const initialState: TFormValues = {
    user: '',
    gender: 'Мужской',
    role: 'Доктор',
    birthDate: '',
  };

  it('Проверяем, что редьюсер возвращает начальное состояние при передаче undefined', () => {
    expect(formReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('Тестируем экшен setFormValues', () => {
    const newFormValues: TFormValues = {
      user: '123',
      gender: 'Мужской',
      role: 'Медбрат',
      birthDate: '1990-01-01',
    };

    expect(formReducer(initialState, setFormValues(newFormValues))).toEqual(newFormValues);
  });

  it('Тестируем экшен updateFormField', () => {
    const updatedState = formReducer(
      initialState,
      updateFormField({ field: 'user', value: '456' }),
    );
    expect(updatedState.user).toBe('456');
    expect(updatedState.gender).toBe('Мужской'); // Другие поля не должны изменяться
  });

  it('Тестируем несколько обновлений поля', () => {
    let updatedState = formReducer(initialState, updateFormField({ field: 'user', value: '456' }));
    updatedState = formReducer(
      updatedState,
      updateFormField({ field: 'gender', value: 'Женский' }),
    );

    expect(updatedState.user).toBe('456');
    expect(updatedState.gender).toBe('Женский');
    expect(updatedState.role).toBe('Доктор');
    expect(updatedState.birthDate).toBe('');
  });
});
