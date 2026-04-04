import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { SessionContext } from '../context/SessionContext';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { saveToken } = useContext(SessionContext);
  const navigate = useNavigate();

  const getEmptyFields = () => {
    const emptyFields: string[] = [];

    if (!email) {
      emptyFields.push('email');
    }
    if (!password) {
      emptyFields.push('password');
    }
    return emptyFields;
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
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
      const response = await login({ email, password });
      saveToken(response.data.token);
      navigate('/dashboard');
      console.log(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setErrors(err.response?.data?.messages ?? ['Something went wrong']);
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>LogIn</h1>
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

export default Login;
