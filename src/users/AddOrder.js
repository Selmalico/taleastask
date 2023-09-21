import React from 'react';
import { Auth } from 'aws-amplify';
import axiosInstance from '../axiosInstance';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Auth.configure({
    region: "eu-west-1",
    userPoolId: "eu-west-1_xSsWW2bZu",
    userPoolWebClientId: "5065r68fg4i4l1pg3olrfjqac6",
  });

const AddToCart = ({ bookId, quantity }) => {
    console.log(bookId);
    console.log(quantity)
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
  const handleClick = async (e) => {
    e.preventDefault();
    // Get the current logged in user
    console.log('works');
    const user = await Auth.currentAuthenticatedUser();

    // Send a POST request to the server to add the book to the cart
    const email = user.attributes.email;
    const request = {email, bookId, quantity};
    console.log(request);
    const response = await axiosInstance.post(
      `/order`,request);
    console.log(bookId, quantity)
    
    // Handle the response
    if (response.status === 201) {
      console.log('Success')
      toast.success('Item added to the cart successfully!', {
        position: 'top-right',
        autoClose: 3000, 
      });
    } else {
      console.log('Error')
      toast.error('Error adding item to the cart.');
    }
  };
  
  return (
    <button onClick={handleClick}>Add to Cart</button>
  );
}

export default AddToCart;