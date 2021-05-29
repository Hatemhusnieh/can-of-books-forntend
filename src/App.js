import React from 'react';
import Header from './components/header/Header';
import IsLoadingAndError from './components/IsLoadingAndError';
import Footer from './components/Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './components/login/Login';
import { withAuth0 } from '@auth0/auth0-react';
import BestBooks from './components/book-section/BestBooks';
import Profile from './components/Profile';



class App extends React.Component {

  render() {
    // console.log(this.props.auth0.isAuthenticated);
    // console.log('children', this.props.children);
    return(
      <>
        <Router>
          <IsLoadingAndError>

            <Header />

            <Switch>
              <Route exact path="/">
                {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
                {this.props.auth0.isAuthenticated&&
                  <BestBooks/>
                }
                {!this.props.auth0.isAuthenticated&&
                  <Login />
                  }
              </Route>

              {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
              <Route exact path='/profile'>
                  <Profile/>
              </Route>
            </Switch>

            <Footer />
            
          </IsLoadingAndError>
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
