import './App.css';
import React from 'react';
import {Switch} from 'react-router-dom';

import Login from "./pages/login/Login";
import PrivateRoute from "./privateRoute/PrivateRoute";
import Welcome from "./components/welcome/Welcome";

import Books from "./pages/books/Books";
import People from "./pages/people/People";
import Movies from "./pages/movies/Movies";

import MovieForm from './pages/movies/components/form/Form'
import BookForm from './pages/books/components/form/Form'
import PeopleForm from './pages/people/components/form/Form'

function App() {

  return (
    <div className="App">
        <Switch>
            <PrivateRoute path="/movies" exact component={Movies} isPrivate/>
            <PrivateRoute path="/movies/form" exact component={MovieForm} isPrivate/>

            <PrivateRoute path="/books" exact component={Books} isPrivate/>
            <PrivateRoute path="/books/form" exact component={BookForm} isPrivate/>

            <PrivateRoute path="/people" exact component={People} isPrivate/>
            <PrivateRoute path="/people/form" exact component={PeopleForm} isPrivate/>

            <PrivateRoute path="/login" component={Login}/>
            <PrivateRoute path="/" component={Welcome} isPrivate/>
        </Switch>
    </div>
  );
}

export default App;
