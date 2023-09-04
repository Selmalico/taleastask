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
import SignupForm from "./components/pages/Signup";
import LoginPage from "./components/pages/Login";
import VerifyEmail from "./components/layout/Verify";
import ShoppingCart from "./components/AddToCart";

function App(props) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
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
    <Router>
      <div className={`App ${isNightMode ? 'night-mode' : 'day-mode'}`}>
        <Navbar isNightMode={isNightMode} onToggle={handleToggle}/>
        {isLoading ? ( <ThreeDotsLoading />) : (
        <Switch>
          {/* Navbar */}
          <Route exact path="/signup" component={SignupForm} />
          <Route exact path= "/login" component={LoginPage} />
          <Route exact path="/verify" component={VerifyEmail} />
          <Route exact path="/order" component={ShoppingCart} />
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
          <Redirect to ="/" />
          <Pagination />
        </Switch>
        )}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
