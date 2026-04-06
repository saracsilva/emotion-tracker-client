import styles from './Badge.module.css';

interface BadgeProps {
  icon: string;
  label: string;
  variant?: 'default' | 'warning' | 'success' | 'danger';
}

function Badge({ icon, label, variant }: BadgeProps) {
  return (
    <span
      className={[
        styles['badge'],
        styles[`badge--${variant || 'default'}`],
      ].join(' ')}
    >
      <span aria-hidden='true' className={styles['badge__icon']}>
        {' '}
        {icon}{' '}
      </span>
      {label}
    </span>
  );
}

export default Badge;
