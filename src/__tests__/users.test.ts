import { getUsers, getUserById, createUser, localupdateUser, deleteUser } from '../utils/api/users';
import reqResApi from '../utils/api/reqResApi';
import { TUser } from 'types/types';

jest.mock('../utils/api/reqResApi'); // Мокаем Axios-инстанс

describe('API методы пользователей', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Сбрасываем моки после каждого теста
  });

  describe('getUsers', () => {
    it('должен возвращать список пользователей', async () => {
      const mockData = {
        data: [
          {
            id: 1,
            email: 'test1@example.com',
            first_name: 'Иван',
            last_name: 'Круглов',
            avatar: '',
          },
          {
            id: 2,
            email: 'test2@example.com',
            first_name: 'Коля',
            last_name: 'Столов',
            avatar: '',
          },
        ],
        total: 2,
      };

      (reqResApi.get as jest.Mock).mockResolvedValue({ data: mockData });

      const result = await getUsers(1);
      expect(result).toEqual(mockData);
      expect(reqResApi.get).toHaveBeenCalledWith('/users?page=1');
    });

    it('должен выбрасывать ошибку, если запрос не удался', async () => {
      (reqResApi.get as jest.Mock).mockRejectedValue(new Error('Network Error'));

      await expect(getUsers(1)).rejects.toThrow('Network Error');
    });
  });

  describe('getUserById', () => {
    it('должен возвращать данные пользователя по ID', async () => {
      const mockData: Partial<TUser> = {
        id: 1,
        email: 'test@example.com',
        first_name: 'Иван',
        last_name: 'Круглов',
        avatar: '',
      };

      (reqResApi.get as jest.Mock).mockResolvedValue({ data: { data: mockData } });

      const result = await getUserById(1);
      expect(result).toEqual(mockData);
      expect(reqResApi.get).toHaveBeenCalledWith('/users/1');
    });

    it('должен выбрасывать ошибку, если запрос не удался', async () => {
      (reqResApi.get as jest.Mock).mockRejectedValue(new Error('User not found'));

      await expect(getUserById(1)).rejects.toThrow('User not found');
    });
  });

  describe('fullUpdateUser', () => {
    it('должен обновить пользователя полностью', async () => {
      const mockResponse = { success: true };

      (reqResApi.put as jest.Mock).mockResolvedValue({ data: mockResponse });

      const result = await createUser(1);
      expect(result).toEqual(mockResponse);
      expect(reqResApi.put).toHaveBeenCalledWith('/users/1');
    });

    it('должен выбрасывать ошибку, если обновление не удалось', async () => {
      (reqResApi.put as jest.Mock).mockRejectedValue(new Error('Update failed'));

      await expect(createUser(1)).rejects.toThrow('Update failed');
    });
  });

  describe('localupdateUser', () => {
    it('должен обновить поле пользователя', async () => {
      const mockResponse = { success: true };

      (reqResApi.patch as jest.Mock).mockResolvedValue({ data: mockResponse });

      const result = await localupdateUser(1);
      expect(result).toEqual(mockResponse);
      expect(reqResApi.patch).toHaveBeenCalledWith('/users/1');
    });

    it('должен выбрасывать ошибку, если обновление не удалось', async () => {
      (reqResApi.patch as jest.Mock).mockRejectedValue(new Error('Patch failed'));

      await expect(localupdateUser(1)).rejects.toThrow('Patch failed');
    });
  });

  describe('deleteUser', () => {
    it('должен удалить пользователя', async () => {
      const mockResponse = { success: true };

      (reqResApi.delete as jest.Mock).mockResolvedValue({ data: mockResponse });

      const result = await deleteUser(1);
      expect(result).toEqual(mockResponse);
      expect(reqResApi.delete).toHaveBeenCalledWith('/users/1');
    });

    it('должен выбрасывать ошибку, если удаление не удалось', async () => {
      (reqResApi.delete as jest.Mock).mockRejectedValue(new Error('Delete failed'));

      await expect(deleteUser(1)).rejects.toThrow('Delete failed');
    });
  });
});
