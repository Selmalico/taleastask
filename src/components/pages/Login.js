import React, { useState } from 'react';
import { Auth } from "aws-amplify";
import axios from 'axios';
import '../styles/Login.css';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Replace with your backend API endpoint
      const response = await axios.post("https://h11nl84387.execute-api.eu-west-1.amazonaws.com/dev/user/login", { username, password });
      if (response.data.status === "success") {
        setSuccess(true);
        setError(null);
        history.push('/')
      } else {
        setError(response.data.error);
        setSuccess(false);
      }
    } catch (err) {
      setError('An error occurred while logging in.');
      setSuccess(false);
    }
  };

  return (
    <section>
    <div className='formvalue'>
      <h2 className='h2'>Login</h2>
      <form onSubmit={handleSubmit} id='loginform'>
        <div className='loginform'>
        <input
            id='username-field'
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        <label>
          Username
        </label>
        <br />
        </div>
        <div className='loginform'>
        <input
            id='password-field'
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        <label>
          Password:
        </label>
        <br />
        </div>
        <input className='btn' id='login-submit' type="submit" value="Login" />
        <div class="register">
            <p>Don't have a account <a href="/signup">Register now!</a> </p>
        </div>
      </form>
      {error && <p>{error}</p>}
      {success && <p>Login successful!</p>}
    </div>
    </section>
  );
};

export default LoginPage;
