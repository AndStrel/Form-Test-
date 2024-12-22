import { HomePageUI } from '@ui/pages';

export const HomePage: React.FC = () => {
  const handleLogin = () => {};

  return (
    <HomePageUI
      title="Главная страница"
      description="Добро пожаловать!"
      handleLogin={handleLogin}
    />
  );
};
