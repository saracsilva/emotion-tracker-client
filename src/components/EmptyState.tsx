import styles from './EmptyState.module.css';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  message: string;
  title: string;
  icon: ReactNode;
}

function EmptyState({ message, title, icon }: EmptyStateProps) {
  return (
    <div className={styles['empty-state']}>
      <div className={styles['empty-state__icon']}>{icon}</div>
      <h3 className={styles['empty-state__title']}>{title}</h3>
      <p className={styles['empty-state__message']}>{message}</p>
    </div>
  );
}

export default EmptyState;
