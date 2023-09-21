import React from "react";
import { Auth } from "aws-amplify";
import axiosInstance from "../axiosInstance";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

Auth.configure({
  region: "eu-west-1",
  userPoolId: "eu-west-1_xSsWW2bZu",
  userPoolWebClientId: "5065r68fg4i4l1pg3olrfjqac6",
});
const UpdateUser = () => {
  const history = useHistory()
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    birthday: "",
    email: "",
    lastname: "",
    password: "",
  });
  const [user, setUser] = useState(null);
  const fetchUserData = async () => {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      setUser(userData);
    } catch (error) {
      console.log("Error fetching the user data", error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  const { name, birthday, email, lastname, password } = formData;
  const validateForm = async () => {
    let formIsValid = true;
    const newErrors = { ...errors };
    const nameRegEx = /^[a-zA-Z]{2,30}$/;
    if (!nameRegEx.test(name)) {
      formIsValid = false;
      newErrors.name = "Name expression is not correct";
    } else {
      newErrors.name = "";
    }
    if (!nameRegEx.test(lastname)) {
        formIsValid = false;
        newErrors.lastname = "Lastame expression is not correct";
      } else {
        newErrors.lastname = "";
      }

    setErrors(newErrors);
    return formIsValid;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm) {
      const user = await Auth.currentAuthenticatedUser();
      const idToken = user.signInUserSession.idToken.jwtToken;
      const email = user.attributes.email;
      const response = await axiosInstance.put(`user/update`, { name, lastname, email, password });

      // Handle the response
      if (response.status === 200) {
        console.log('Success')
        history.push('/');
        await Auth.currentAuthenticatedUser({ bypassCache: true });
        window.location.reload();
      } else {
        console.log('Error')
      }
    } else {
        console.log('non valid');
    }
  };
return (
    <section>
    <div className='formvalue' style={{height: '600px', }}>
      <h2 className='h2'>Update</h2>
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
            id='username-field'
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
          <label>Last name</label>
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
        <input className='btn' id='login-submit' type="submit" value="Update" />
      </form>
    </div>
    </section>)
};

export default UpdateUser;
