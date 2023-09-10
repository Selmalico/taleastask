import axios from "axios";
import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import '../components/styles/Order.css';

const ShoppingCart = () => {
  const [cart, setCart] = useState(null);
  const [user, setUser] = useState(null);
  const [total, setTotal] = useState(null);
  const fetchUserData = async () => {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      setUser(userData);
    } catch (error) {
      console.log("Error fetching the user data", error);
    }
  };
  const fetchCart = async () => {
    const user = await Auth.currentAuthenticatedUser();
    const idToken = user.signInUserSession.idToken.jwtToken;
    const email = user.attributes.email;
    const response = await axios.get(
      `https://h11nl84387.execute-api.eu-west-1.amazonaws.com/dev/order?email=${email}`,
      { headers: { Authorization: `Bearer ${idToken}` } }
    );
    console.log(response);
    setCart(response.data.order);
    setTotal(response.data.totalPrice);
  };

  useEffect(() => {
    fetchUserData();
    fetchCart();
  }, []);

  if (!cart) return <div>Loading...</div>;

  return (
    <div className="bill-container">
      <div className="bill-header">Order Summary</div>
      {cart.items.map((item) => (
        <div className="bill-item" key={item.book._id}>
          <h2>{item.book.title}</h2>
          <h4>Price: {item.book.price} $</h4>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}
      <div className="bill-total">Total: {total}$</div>
      <div className="bill-buttons">
        <Link to={``} className="btn btn-warning">
          Submit
        </Link>
        <Link to={`/order/edit/${cart._id}`} className="btn btn-warning">
          Edit Order
        </Link>
      </div>
    </div>
  );
};

export default ShoppingCart;
