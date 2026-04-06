function Header({ user }: { user: { firstName: string } | null }) {
  return (
    <header className='bg-background p-6 pl-11 rounded-xl'>
      <h1 className='font-semibold text-2xl'>
        Welcome back, <span className='font-extrabold'>{user?.firstName}</span>!
      </h1>
      <p className='font-light text-lg'>
        {new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
    </header>
  );
}

export default Header;
