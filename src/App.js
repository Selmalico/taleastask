import React from "react";
import { useState, useEffect } from "react";
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import BookView from "./components/books/BookView";
import Contact from "./components/pages/Contact";
import Genre from "./components/genres/Genre";
import EditAuthor from "./components/authors/EditAuthor";
import Navbar from "./components/layout/Navbar";
import Footer from "../src/components/pages/Footer";
import ConfirmationPage from "./components/ConfirmationPage";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from "react-router-dom";
import AddBook from "./components/books/AddBook";
import EditBook from "./components/books/EditBook";
import Books from "./components/pages/Books";
import Genres from "./components/pages/Genres";
import Authors from "./components/pages/Authors";
import Author from "./components/authors/Author";
import EditGenre from "./components/genres/EditGenre";
import AddAuthor from "./components/authors/AddAuthor";
import AddGenre from "./components/genres/AddGenre";
import { Pagination } from "react-bootstrap";
import Home from "./components/pages/Home";
import ThreeDotsLoading from "./components/loading/ThreeDotsLoading";
import NotFound from "./components/pages/NotFound";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Email from "./components/pages/Email";
import SignupForm from "./users/Signup";
import LoginPage from "./users/Login";
import VerifyEmail from "./components/layout/Verify";
import ShoppingCart from "./users/AddToCart";
import {Auth} from 'aws-amplify';
import { useContext } from 'react';
import updateUser from "./users/updateUser";
import UpdateUser from "./users/updateUser";
import {Amplify} from 'aws-amplify';
import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';
import { AuthProvider } from "./users/AuthProvider";
import UpdateOrder from "./users/OrderUpdate";
import ForgotPasswordPage from "./users/ForggotPassword";
import NavbarComponent from "./components/layout/Navbar";
Amplify.configure({
  Auth: {
      region: 'eu-west-1',
      userPoolId: 'eu-west-1_gyrdwaP3v',
      userPoolWebClientId: '1i7s4i3nsmleqfihmmri50i2mu'
  }
});

function App(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser]= useState(null)
  const fetchUser = async () => {
    const client = await Auth.currentAuthenticatedUser();
    setUser(client);
  }
  useEffect(() => {
    fetchUser();
    setIsLoading(true);
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(loadingTimeout);
  },[10] );

  const [isNightMode, setIsNightMode] = useState(false);

  const handleToggle = () => {
    setIsNightMode(!isNightMode);
  };
  
  return (
    <AuthProvider >
    <Router>
      <div className={`App ${isNightMode ? 'night-mode' : 'day-mode'}`}>
        <NavbarComponent isNightMode={isNightMode} onToggle={handleToggle}/>
        {isLoading ? ( <ThreeDotsLoading />) : (
        <Switch>
          {/* Navbar */}
          <Route exact path="/signup" component={SignupForm} />
          <Route exact path= "/login" component={LoginPage} />
          <Route exact path="/verify" component={VerifyEmail} />
          <Route exact path="/forgotPassword" component={ForgotPasswordPage} />
          <Route exact path="/books" component={Home} />
          <Route exact path="/">
            <Books isNightMode={isNightMode} />
          </Route>
          <Route exact path="/genres">
            <Genres isNightMode={isNightMode} />
          </Route>
          <Route exact path="/authors">
            <Authors isNightMode={isNightMode} />
          </Route>
          <Route exact path = "/contact" component = {Contact} />
          <Route exact path="/subscribe/confirm/:email" component={ConfirmationPage} />

          {/*Author*/}
          {user ? <>
          <Route exact path= "/order/edit/:id" component={UpdateOrder} />
          <Route exact path= "/updateUser" component={UpdateUser} />
          <Route exact path="/order" component={ShoppingCart} />
          <Route exact path="/authors/:id">
            <Author isNightMode={isNightMode} />
          </Route>
          <Route exact path="/authors/edit/:id" component={EditAuthor} />
          <Route exact path = "/author/add" component = {AddAuthor} />
          
          {/* Genre */}
          <Route exact path="/genres/:id">
            <Genre isNightMode={isNightMode} />
          </Route>
          <Route exact path= "/genres/edit/:id" component = {EditGenre} />
          <Route exact path = "/genre/add" component = {AddGenre} />

         {/* Book */}
         <Route exact path="/book/add">
            <AddBook isNightMode={isNightMode} />
          </Route>
          <Route exact path="/books/edit/:id" component={EditBook} />
          <Route exact path="/books/:id">
            <BookView isNightMode={isNightMode} />
          </Route>
          <Route exact path="/notfound" component= {NotFound}/>
          <Route exact path="/email" component={Email} />

          </> : <Redirect to ="/login" />}
        </Switch>
        )}
        <Footer />
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
