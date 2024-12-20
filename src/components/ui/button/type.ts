export type ButtonProps = {
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
};
