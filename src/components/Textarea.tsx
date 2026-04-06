import styles from './Textarea.module.css';

interface TextareaProps {
  placeholder?: string;
  name: string;
  value?: string;
}

function Textarea({
  placeholder = 'Write something...',
  name,
  value = '',
}: TextareaProps) {
  return (
    <textarea
      className={styles.textarea}
      placeholder={placeholder}
      name={name}
      defaultValue={value}
    />
  );
}

export default Textarea;
