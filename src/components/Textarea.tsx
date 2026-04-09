import styles from './Textarea.module.css';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder?: string;
  name: string;
  value?: string;
}

function Textarea({
  placeholder = 'Write something...',
  name,
  value = '',
  ...rest
}: TextareaProps) {
  return (
    <textarea
      {...rest}
      className={[styles.textarea, rest.className].join(' ')}
      placeholder={placeholder}
      name={name}
      defaultValue={value}
    />
  );
}

export default Textarea;
