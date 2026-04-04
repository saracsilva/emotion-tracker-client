import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

function Button({ children, fullWidth = false }: ButtonProps) {
  return (
    <button
      className={[
        styles['button'],
        fullWidth ? styles['button--full-width'] : '',
      ].join(' ')}
    >
      {children}
    </button>
  );
}

export default Button;
