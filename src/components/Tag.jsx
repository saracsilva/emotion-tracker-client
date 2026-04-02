import { useState } from 'react';
import styles from './Tag.module.css';

function Tag({ emoji, name, id, checkable = true }) {
  const [selected, setSelected] = useState(false);

  const handleChange = () => {
    setSelected((prev) => !prev);
  };

  return (
    <>
      {checkable ? (
        <label
          htmlFor={name}
          className={[styles.tag, selected ? styles['tag--selected'] : ''].join(
            ' ',
          )}
        >
          <input
            type='checkbox'
            id={name}
            value={id}
            name='emotion'
            checked={selected}
            onChange={handleChange}
            className={styles['tag__input']}
          />
          <span aria-hidden='true' className={styles.tag__emoji}>
            {emoji}{' '}
          </span>
          {name}
        </label>
      ) : (
        <span className={styles['tag--static']}>
          <span aria-hidden='true' className={styles.tag__emoji}>
            {' '}
            {emoji}{' '}
          </span>
          {name}
        </span>
      )}{' '}
    </>
  );
}

export default Tag;
