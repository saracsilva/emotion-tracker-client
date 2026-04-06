import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  iconOnly?: boolean;
}

function Button({
  children,
  fullWidth = false,
  iconOnly = false,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={[
        styles['button'],
        fullWidth ? styles['button--full-width'] : '',
        iconOnly ? styles['button--icon-only'] : '',
      ].join(' ')}
    >
      {children}
    </button>
  );
}

export default Button;
