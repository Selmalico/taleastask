import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const VerifyEmail = () => {
    const history = useHistory();
    const [code, setCode] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://h11nl84387.execute-api.eu-west-1.amazonaws.com/dev/user/verify', {code, email})
            const data = await response.json();
            if (data.success) {
                alert('Email verified successfully!');
                history.push('/login');
            } else {
                alert(`Error verifying email: ${data.message}`);
            }
        } catch (error) {
            alert(`Error verifying email: ${error.message}`);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Verification Code:
                <input type="text" value={code} onChange={event => setCode(event.target.value)} />
            </label>
            <label>
                Email: 
                <input type='email' value={email} onChange={event => setEmail(event.target.value)} />
            </label>
            <br />
            <input type="submit" value="Verify Email" />
        </form>
    );
}

export default VerifyEmail;
