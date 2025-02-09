import UserTable from '@components/table/tableUser';
import { openDrawer, setIsRedacting, setUser } from '@utils/slices/drawerSlice';
import { RootState, useAppDispatch, useAppSelector } from '@utils/store';

import { Button, Space, Typography } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import { StyleEnum } from '@utils/constants';
import Title from 'antd/es/typography/Title';

const { Text } = Typography;

const getUsersEnding = (count: number): string => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return 'человек';
  } else if (
    lastDigit >= 2 &&
    lastDigit <= 4 &&
    (lastTwoDigits < 12 || lastTwoDigits > 14)
  ) {
    return 'человека';
  } else {
    return 'человек';
  }
};

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state: RootState) => state.users.users);

  const createUser = () => {
    dispatch(setIsRedacting(false));
    dispatch(setUser({}));
    dispatch(openDrawer());
  };

  return (
    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
      <Space
        direction="horizontal"
        size="large"
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Text style={{ fontFamily: StyleEnum.fontFamily }}>
          Пользователи клиники
          {` ${users.length} ${getUsersEnding(users.length)}`}
        </Text>

        <Button
          type="primary"
          style={{
            backgroundColor: StyleEnum.Green,
            fontFamily: StyleEnum.fontFamily,
          }}
          icon={
            <PlusCircleFilled
              style={{
                color: StyleEnum.DarkGren,
                borderRadius: '50%',
                background: StyleEnum.White,
              }}
            />
          }
          onClick={() => createUser()}
        >
          Добавить нового пользователя
        </Button>
      </Space>

      <UserTable />
    </Space>
  );
};
