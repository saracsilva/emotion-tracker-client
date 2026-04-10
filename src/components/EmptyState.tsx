import Button from './Button';
import styles from './EmptyState.module.css';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  message: string;
  title: string;
  icon: ReactNode;
  action?: ReactNode;
}

function EmptyState({ message, title, icon, action }: EmptyStateProps) {
  return (
    <div className={styles['empty-state']}>
      <div className={styles['empty-state__icon']}>{icon}</div>
      <h3 className={styles['empty-state__title']}>{title}</h3>
      <p className={styles['empty-state__message']}>{message}</p>

      {action && <div className='mt-4'>{action}</div>}
    </div>
  );
}

export default EmptyState;
