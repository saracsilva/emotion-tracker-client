import { Link } from 'react-router-dom';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  iconOnly?: boolean;
  variant?: 'default' | 'primary' | 'secondary';
  path?: string;
}

function Button({
  children,
  fullWidth = false,
  iconOnly = false,
  variant = 'default',
  path = '',
  ...rest
}: ButtonProps) {
  const className = [
    styles['button'],
    styles['button--' + variant],
    fullWidth ? styles['button--full-width'] : '',
    iconOnly ? styles['button--icon-only'] : '',
    rest.className || '',
  ].join(' ');

  if (path) {
    return (
      <Link to={path} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button {...rest} className={className}>
      {children}
    </button>
  );
}

export default Button;
