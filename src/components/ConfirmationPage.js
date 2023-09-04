import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const ThankYouPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const ThankYouText = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-align: center;
`;

const ConfirmationPage = () => {
  const { email } = useParams();

  useEffect(() => {
    // Make an API call to confirm the subscription
    axios.get(`https://h11nl84387.execute-api.eu-west-1.amazonaws.com/dev/subscribe/${email}`)
      .then(response => {
        console.log("inside");
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [email]);

  return (
    <ThankYouPage>
      <ThankYouText>Thank you for subscribing! 🎉</ThankYouText>
    </ThankYouPage>
  );
};

export default ConfirmationPage;
