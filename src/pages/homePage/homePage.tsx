import { HomePageUI } from '@ui/pages';
import { useNavigate } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/form');
  };

  return (
    <>
      <HomePageUI
        title="Главная страница"
        description="Добро пожаловать!"
        handleLogin={handleLogin}
      />
    </>
  );
};
