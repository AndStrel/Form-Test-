import styles from '@styles/components/button.module.scss';
import clsx from 'clsx';
import { ButtonProps } from './type';

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  icon,
  children,
  onClick,
}) => {
  return (
    <button
      className={clsx(
        styles.button,
        styles[`button__${variant}`], // Модификатор
      )}
      onClick={onClick}
    >
      {icon && <span className={styles.button__icon}>{icon}</span>} {children}
    </button>
  );
};

export default Button;
