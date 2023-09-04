import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

const Email = () => {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post('https://mbdhs6j8u7.execute-api.eu-west-1.amazonaws.com/prod/subscribe', {
          email,
          subject,
          message,
        });
        setStatus(response.data.message);
        setEmail('');
        setSubject('');
        setMessage('');
      } catch (error) {
        console.error(error);
        console.log(error);
        setStatus('Failed to send email. Please try again later.');
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Customer's Email" />
        <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" />
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message"></textarea>
        <button type="submit">Send Email</button>
        <p>{status}</p>
      </form>
    );
  };
  

export default Email;
