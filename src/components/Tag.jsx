import { useState } from 'react';
import styles from './Tag.module.css';

function Tag({ emoticon, name, handleEmotions }) {
  const [selected, setSelected] = useState(false);

  const handleChange = () => {
    setSelected((prev) => !prev);
  };

  return (
    <label
      htmlFor={name}
      className={[styles.tag, selected ? styles['tag--selected'] : ''].join(
        ' ',
      )}
    >
      <input
        type='checkbox'
        id={name}
        name='emotion'
        checked={selected}
        onChange={handleChange}
        className={styles['tag__input']}
      />
      <span aria-hidden='true' className={styles.tag__emoji}>
        {emoticon}{' '}
      </span>
      {name}
    </label>
  );
}

export default Tag;
