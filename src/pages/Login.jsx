import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { SessionContext } from '../context/SessionContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { saveToken } = useContext(SessionContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      saveToken(response.data.token);
      navigate('/dashboard');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>LogIn</h1>
      <form onSubmit={handleSubmit}>
        <div className='form__field'>
          <label htmlFor='email'>E-mail</label>
          <input
            type='email'
            id='email'
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
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Login;
