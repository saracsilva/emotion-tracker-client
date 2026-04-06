import Badge from '../components/Badge';

function Header({
  user,
  streak,
}: {
  user: { firstName: string } | null;
  streak: number;
}) {
  const streakVariant = streak >= 3 ? 'success' : 'warning';
  const streakIcon = streak >= 3 ? '🔥' : '💚';

  return (
    <header className='bg-background p-6 pl-11 rounded-xl flex items-center justify-between'>
      <div>
        <h1 className='font-semibold text-2xl'>
          Welcome back,{' '}
          <span className='font-extrabold'>{user?.firstName}</span>!
        </h1>
        <p className='font-light text-lg'>
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
      {streak > 0 && (
        <Badge
          icon={streakIcon}
          label={`${streak}-day streak`}
          variant={streakVariant}
        />
      )}
    </header>
  );
}

export default Header;
