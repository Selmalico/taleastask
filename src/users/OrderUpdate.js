import { useState, useEffect } from "react";
import axios from "axios";
import { Auth } from "aws-amplify";
import { useParams } from "react-router-dom";
const UpdateOrder = async () => {
const [email, setEmail] = useState('');
  const [bookId, setBookId] = useState('');
  const [newQuantity, setNewQuantity] = useState(0);
  const [response, setResponse] = useState(null);
  const { id } = useParams()
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const user = await Auth.currentAuthenticatedUser();
    const idToken = user.signInUserSession.idToken.jwtToken;
      const res = await axios.put(
        `https://h11nl84387.execute-api.eu-west-1.amazonaws.com/dev/order/${id}`,
        { email, bookId, newQuantity }, {headers : {Authorization: `Barear ${idToken}`}}
      );
      setResponse(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Update Order</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <br />
        <label>
          Book ID:
          <input
            type="text"
            value={bookId}
            onChange={(event) => setBookId(event.target.value)}
          />
        </label>
        <br />
        <label>
          New Quantity:
          <input
            type="number"
            value={newQuantity}
            onChange={(event) => setNewQuantity(event.target.value)}
          />
        </label>
        <br />
        <input type="submit" value="Update Order" />
      </form>
      {response && (
        <>
          <h2>Order Updated</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </>
      )}
    </div>
  );
}
export default UpdateOrder;