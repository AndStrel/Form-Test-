import { Button } from '@ui/button';
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
      <Button variant="primary" onClick={handleLogin}>
        Log In
      </Button>
    </div>
  );
};
