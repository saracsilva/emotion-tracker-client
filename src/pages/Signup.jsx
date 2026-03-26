import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/auth';

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getEmptyFields = () => {
    const emptyFields = [];
    if (!firstName) {
      emptyFields.push('first name');
    }
    if (!lastName) {
      emptyFields.push('last name');
    }
    if (!email) {
      emptyFields.push('email');
    }
    if (!password) {
      emptyFields.push('password');
    }
    return emptyFields;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);

    const emptyFields = getEmptyFields();
    if (emptyFields.length > 0) {
      setErrors([`Please fill in: ${emptyFields.join(', ')}`]);
      setIsLoading(false);
      return;
    }

    try {
      const response = await signup({ firstName, lastName, email, password });
      navigate('/login');
    } catch (err) {
      setErrors(err.response.data.messages);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>SignUp</h1>
      <form onSubmit={handleSubmit}>
        {errors.length > 0 && (
          <ul>
            {errors.map((error, index) => (
              <li key={index} style={{ color: 'red' }}>
                {error}
              </li>
            ))}
          </ul>
        )}
        <div className='form__field'>
          <label htmlFor='firstName'>First name</label>
          <input
            type='text'
            id='firstName'
            data-cy='firstName-input'
            placeholder='Enter your first name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className='form__field'>
          <label htmlFor='lastName'>Last name</label>
          <input
            type='text'
            id='lastName'
            data-cy='lastName-input'
            placeholder='Enter your last name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className='form__field'>
          <label htmlFor='email'>E-mail</label>
          <input
            type='email'
            id='email'
            data-cy='email-input'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='form__field'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            data-cy='password-input'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button data-cy='submit-button' disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default Signup;
