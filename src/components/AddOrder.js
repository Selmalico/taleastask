import React from 'react';
import { Auth } from 'aws-amplify';
import axios from 'axios';

Auth.configure({
    region: "eu-west-1",
    userPoolId: "eu-west-1_xSsWW2bZu",
    userPoolWebClientId: "5065r68fg4i4l1pg3olrfjqac6",
  });

const AddToCart = ({ bookId, quantity }) => {
    console.log(bookId);
    console.log(quantity)
  const handleClick = async () => {
    // Get the current logged in user
    console.log('works');
    const user = await Auth.currentAuthenticatedUser();

    // Get the user's JWT token
    const token = user.signInUserSession.accessToken.jwtToken;

    // Send a POST request to the server to add the book to the cart
    console.log(token);
    const response = await axios.post(
      `https://h11nl84387.execute-api.eu-west-1.amazonaws.com/dev/order`,
      { bookId, quantity },
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        },
      }
    );
    console.log(bookId, quantity)
    
    // Handle the response
    if (response.status === 201) {
      console.log('Success')
    } else {
      console.log('Error')
    }
  };
  
  return (
    <button onClick={handleClick}>Add to Cart</button>
  );
}

export default AddToCart;