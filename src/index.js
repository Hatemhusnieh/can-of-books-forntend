import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";

// TODO: wrap everything in Auth0
// account was created with GitHub
ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-3jpjgfod.us.auth0.com"
      clientId="SiW22PapjH3hHoflXaL2XgkgKee0FT9N"
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
