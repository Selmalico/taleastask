import React, { useState } from 'react';
import { Auth } from "aws-amplify";
import '../components/styles/Login.css';
import { useHistory } from 'react-router-dom';

Auth.configure({
  region: "eu-west-1",
  userPoolId: "eu-west-1_gyrdwaP3v",
  userPoolWebClientId: "1i7s4i3nsmleqfihmmri50i2mu",
});

const LoginPage = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await Auth.signIn(username, password);
      console.log('Logged in user:', user);
      if (!user) {
        throw new Error("Invalid user object or access token");
      }

      const idToken = user.signInUserSession.idToken.jwtToken;
      const accessToken = user.signInUserSession.accessToken.jwtToken;

      localStorage.setItem("idToken", idToken);
      localStorage.setItem("accessToken", accessToken);
      console.log(username)

      setSuccess(true);
      setError(null);
      history.push('/')
      window.location.reload()
    } catch (err) {
      setError('An error occurred while logging in.');
      setSuccess(false);
    }
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    try {
      // Initiate forgot password flow
      await Auth.forgotPassword(username);

      // Prompt user for verification code and new password
      const code = prompt('Enter verification code:');
      const newPassword = prompt('Enter new password:');

      // Reset password
      await Auth.forgotPasswordSubmit(username, code, newPassword);

      setSuccess(true);
      setError(null);
    } catch (err) {
      setError('An error occurred while resetting password.');
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
        <button onClick={handleForgotPassword}>Forgot Password</button>
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
