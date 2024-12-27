import { Button } from 'antd';
import { HomePageUIProps } from './type';

export const HomePageUI: React.FC<HomePageUIProps> = ({
  title = 'Home Page',
  description = 'Welcome to the home page!',
  handleLogin,
}: HomePageUIProps) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <Button variant="solid" onClick={handleLogin}>
        Log In
      </Button>
    </div>
  );
};
