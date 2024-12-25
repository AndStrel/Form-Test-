import { TUser } from 'types/types';
import reqResApi from './reqResApi';

// Получение списка пользователей
export const getUsers = async (page = 1): Promise<{ data: TUser[]; total: number }> => {
  try {
    const response = await reqResApi.get(`/users?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при загрузке пользователей:', error);
    throw error;
  }
};

// Получение конкретного пользователя
export const getUserById = async (id: number): Promise<TUser> => {
  try {
    const response = await reqResApi.get(`/users/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Ошибка при загрузке пользователя:', error);
    throw error;
  }
};

// Редактирование пользователя полностью
export const fullUpdateUser = async (id: number) => {
  try {
    const response = await reqResApi.put(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при редактировании пользователя:', error);
    throw error;
  }
};

// Редактирование поля пользователя
export const localupdateUser = async (id: number) => {
  try {
    const response = await reqResApi.patch(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при редактировании поля:', error);
    throw error;
  }
};

// удаление пользователя
export const deleteUser = async (id: number) => {
  try {
    const response = await reqResApi.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при удалении пользователя:', error);
    throw error;
  }
};
