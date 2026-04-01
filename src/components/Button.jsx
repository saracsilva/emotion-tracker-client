import styles from './Button.module.css';

function Button({ children, fullWidth = false }) {
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
