import React, { useState } from 'react';
import { Auth } from "aws-amplify";
import axios from 'axios';
import '../styles/Login.css';
import { useHistory } from 'react-router-dom';

Auth.configure({
  region: "eu-west-1",
  userPoolId: "eu-west-1_xSsWW2bZu",
  userPoolWebClientId: "5065r68fg4i4l1pg3olrfjqac6",
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
      const user = await Auth.signIn(username, password, {
        authenticationFlowType: "USER_PASSWORD_AUTH",
      });
      console.log(user);
      if (!user || !user.signInUserSession || !user.signInUserSession.accessToken) {
        throw new Error("Invalid user object or access token");
      }
  
      const idToken = user.signInUserSession.idToken.jwtToken;
      const accessToken = user.signInUserSession.accessToken.jwtToken;

      localStorage.setItem("idToken", idToken);
      localStorage.setItem("accessToken", accessToken);
      console.log(username)

      const response = await axios.post("https://h11nl84387.execute-api.eu-west-1.amazonaws.com/dev/user/login", { username, password },  {headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },});
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
