import './App.css';
import React from 'react';
import {Switch} from 'react-router-dom';
import {QueryClient,QueryClientProvider} from 'react-query';

import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import PrivateRoute from "./privateRoute/PrivateRoute";
import Welcome from "./components/welcome/Welcome";

import Books from "./pages/books/Books";
import People from "./pages/people/People";
import Movies from "./pages/movies/Movies";

import MovieForm from './pages/movies/components/form/Form'
import BookForm from './pages/books/components/form/Form'
import PeopleForm from './pages/people/components/form/Form'



function App() {

    const queryClient = new QueryClient()

  return (
      <QueryClientProvider client={queryClient}>
    <div className="App">
        <Switch>
            <PrivateRoute path="/movies" exact component={Movies} isPrivate/>
            <PrivateRoute path="/movies/create" exact component={MovieForm} isPrivate/>
            <PrivateRoute path="/movies/edit/:id" exact component={MovieForm} isPrivate/>

            <PrivateRoute path="/books" exact component={Books} isPrivate/>
            <PrivateRoute path="/books/create/" exact component={BookForm} isPrivate/>
            <PrivateRoute path="/books/edit/:id" exact component={BookForm} isPrivate/>

            <PrivateRoute path="/people" exact component={People} isPrivate/>
            <PrivateRoute path="/people/create" exact component={PeopleForm} isPrivate/>
            <PrivateRoute path="/people/edit/:id" exact component={PeopleForm} isPrivate/>

            <PrivateRoute path="/login" component={Login}/>
            <PrivateRoute path="/register" component={Register}/>
            <PrivateRoute path="/" component={Welcome} isPrivate/>
        </Switch>
    </div>
         </QueryClientProvider>
  );
}

export default App;
