import './App.css';
import React from 'react';
import {Switch} from 'react-router-dom';
import {QueryClient,QueryClientProvider} from 'react-query';
import {LazyLoad} from "./functions/tools";

import PrivateRoute from "./privateRoute/PrivateRoute";

const Login = LazyLoad('login/Login');
const Register = LazyLoad('register/Register');
const WelcomePage = LazyLoad('welcomePage/WelcomePage');

const Books = LazyLoad('books/Books');
const People = LazyLoad('people/People');
const Movies = LazyLoad('movies/Movies');

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
                <PrivateRoute path="/" component={WelcomePage} isPrivate/>
            </Switch>
        </div>
      </QueryClientProvider>
  );
}

export default App;
