import styles from './Blockquote.module.css';
import { Link } from 'react-router-dom';

interface BlockquoteProps {
  children: React.ReactNode;
  link?: string;
  linkLabel?: string;
}

function Blockquote({
  children,
  link,
  linkLabel = 'Read full entry',
}: BlockquoteProps) {
  return (
    <figure className={styles.blockquote}>
      <blockquote className={styles.blockquote__quote}>
        <p className={styles.blockquote__text}>{children}</p>
      </blockquote>
      {link && (
        <figcaption>
          <Link className={styles.blockquote__link} to={link}>
            {linkLabel}
          </Link>
        </figcaption>
      )}
    </figure>
  );
}

export default Blockquote;
