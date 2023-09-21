import React, { useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import "../styles/Login.css"

const VerifyEmail = () => {
    const history = useHistory();
    const [code, setCode] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axiosInstance.post('/user/verify', {code, email})
            if (response.status === 200) {
                alert('Email verified successfully!');
                history.push('/login');
            } else {
                alert(`Error verifying email: ${response.message}`);
            }
        } catch (error) {
            alert(`Error verifying email: ${error.message}`);
        }
    }

    return (
        <section>
        <div className='formvalue'>
        <form onSubmit={handleSubmit}>
            <div className='loginform'>
            <input id='username-field' type="text" value={code} onChange={event => setCode(event.target.value)} />
            <label>
                Verification Code:
            </label>
            </div>
            <div className='loginform'>
            <input id='username-field' type='email' value={email} onChange={event => setEmail(event.target.value)} />
            <label>
                Email: 
            </label>
            </div>
            <br />
            <input className='btn' id= "login-submit" type="submit" value="Verify Email" />
        </form>
        </div>
        </section>
    );
}

export default VerifyEmail;
