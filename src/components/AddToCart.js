import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ShoppingCart = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      const response = await axios.get(`https://h11nl84387.execute-api.eu-west-1.amazonaws.com/dev/order`);
      setCart(response.data);
    };
    
    fetchCart();
  }, []);

  if (!cart) return <div>Loading...</div>;

  return (
    <div>
      {cart.items.map(item => (
        <div key={item.book._id}>
          <h2>{item.book.title}</h2>
          <h2>{item.book.price}</h2>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}
    </div>
  );
}

export default ShoppingCart;

