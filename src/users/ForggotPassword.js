import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';

const ForgotPasswordPage = (props) => {
  const location = useLocation();
  const history = useHistory();
  // Extract username from query parameter
  const usernameFromQuery = props.location.state.username
  
  const [username, setUsername] = useState(usernameFromQuery);
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    try {

      await Auth.forgotPasswordSubmit(username, code, newPassword);

      setSuccess(true);
      setError(null);
      history.push("/login")
    } catch (err) {
      setError("An error occurred while resetting the password.");
      setSuccess(false);
    }
  };

  return (
    <section>
    <div className='formvalue'>
      <h2 className='h2'>Forgot Password</h2>
      <form onSubmit={handleForgotPassword} id='loginform'>
        <div className='loginform'>
        <input type="text" value={username} readOnly />
        <label style={{top: "-5px"}}>
          Username:
        </label>
        </div>
        <div className='loginform'>
        <input type="text" value={code} onChange={(e) => setCode(e.target.value)} required />
        <label>
          Verification Code:
        </label>
        </div>
        <div className='loginform'>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        <label>
          New Password:
        </label>
        </div>
        <input type="submit" className='btn' id='login-submit' value="Reset Password" />
      </form>
      {error && <p>{error}</p>}
      {success && <p>Password reset successful!</p>}
    </div>
    </section>
  );
};

export default ForgotPasswordPage;
