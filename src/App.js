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


function App() {

    const queryClient = new QueryClient()

  return (
      <QueryClientProvider client={queryClient}>
        <div className="App">
            <Switch>
                <PrivateRoute path="/movies" exact component={Movies} isPrivate/>
                <PrivateRoute path="/books" exact component={Books} isPrivate/>
                <PrivateRoute path="/people" exact component={People} isPrivate/>

                <PrivateRoute path="/login" component={Login}/>
                <PrivateRoute path="/register" component={Register}/>
                <PrivateRoute path="/" component={Welcome} isPrivate/>
            </Switch>
        </div>
      </QueryClientProvider>
  );
}

export default App;
