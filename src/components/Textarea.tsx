import styles from './Textarea.module.css';

interface TextareaProps {
  placeholder: string;
  name: string;
}

function Textarea({ placeholder = 'Write something...', name }: TextareaProps) {
  return (
    <textarea
      className={styles.textarea}
      placeholder={placeholder}
      name={name}
    />
  );
}

export default Textarea;
