// src/components/SignupForm.js
import React, { useState } from 'react';
import {Auth} from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';
Auth.configure({
    region: "eu-west-1",
    userPoolId: "eu-west-1_xSsWW2bZu",
    userPoolWebClientId: "5065r68fg4i4l1pg3olrfjqac6",
  });

const SignupForm = () => {
  let history = useHistory();
  const [formData, setFormData] = useState({
    name: '',
    birthday: '',
    phone: '',
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    birthday: '',
    email: '',
    username: '',
    password: '',
  });
  const {name, birthday, email, username, password} = formData;
  const validateForm = async () => {
    let formIsValid = true;
    const newErrors = {...errors};
    const nameRegEx = /^[a-zA-Z]+ [a-zA-Z]{2,30}$/;
    const birthdayValidation = /^\d{4}-\d{2}-\d{2}$/;
    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if(!name) {
        formIsValid = false;
        newErrors.name = "Full name is required";
    } else if(!nameRegEx.test(name)){
        formIsValid = false;
        newErrors.name = 'Name expression is not correct';
    } else {
        newErrors.name = "";
    }

    if(!birthday) {
        formIsValid = false;
        newErrors.birthday = 'Birthday is required';
    } else if (!birthdayValidation.test(birthday)){
        formIsValid = false;
        newErrors.birthday = 'You must be more than 18 years to have a account';
    } else {
        newErrors.birthday = "";
    }

    if(!email) {
        formIsValid = false;
        newErrors.email = 'Email is required';
    } else if(!emailRegEx.test(email)){
        formIsValid = false;
        newErrors.email = 'Email provided is not correct expression';
    } else {
        newErrors.email = "";
    }

    if(!username) {
        formIsValid = false;
        newErrors.username = 'Username is required';
    } else{
        newErrors.email = "";
    }

    if (!password) {
        formIsValid = false;
        newErrors.password = 'Password is required';
    } else if (!passwordRegex.test(password)){
        formIsValid = false;
        newErrors.password = "Invalid password format! Password must be at least 8 characters long and should contain at least one number, one letter and one symbol.";
    } else {
        newErrors.password = "";
    }

    setErrors(newErrors);
    return formIsValid;
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(validateForm()){
    try {
      const response = await axios.post("https://h11nl84387.execute-api.eu-west-1.amazonaws.com/dev/user/signup", formData);
      console.log(response.data);
      history.push({
        pathname: '/verify',
        state: { email }
    });
    } catch (error) {
      console.error('Error during signup:', error);
    }
  }};

  return (
    <section>
    <div className='formvalue' style={{height: '600px', }}>
      <h2 className='h2'>Sign Up</h2>
      <form onSubmit={handleSubmit} id='loginform'>
        <div className='loginform'>
        <input
            id='username-field'
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <label>Name</label>
        </div>
        <div className='loginform'>
          <input
            id='date-field'
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
          />
        </div>
        <div className='loginform'>
          <label>Email:</label>
          <input
            id='username-field'
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className='loginform'>
        <input
            id='username-field'
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <label>Username:</label>
        </div>
        <div className='loginform'>
        <input
            id='password-field'
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <label>Password:</label>
        </div>
        <input className='btn' id='login-submit' type="submit" value="Signup" />
      </form>
    </div>
    </section>
  );
};

export default SignupForm;
