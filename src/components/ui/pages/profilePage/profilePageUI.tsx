import { Button } from '@ui/button';
import { ProfilePageUIProps } from './type';

export const ProfilePageUI: React.FC<ProfilePageUIProps> = ({
  title,
  description,
  name,
  handleLogout,
}) => {
  return (
    <div>
      <h1>{title}</h1>
      <h2>Welcome, {name}!</h2>
      <p>{description}</p>
      <Button variant="secondary" onClick={handleLogout}>
        Log Out
      </Button>
    </div>
  );
};
