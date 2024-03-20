import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ReactGA from 'react-ga4';

import { Auth0Provider } from "@auth0/auth0-react";

import {LoadScript} from '@react-google-maps/api';
import 'dotenv/config'


ReactGA.initialize("G-BE8WDNBGS7");


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    
    <Auth0Provider 
      domain="dev-uujtiin6xxo47cy3.us.auth0.com"
      clientId="Net3dnd5HahABxD2GelMnUn9eSD1BFnv"
      useRefreshTokens={true} 
      cacheLocation="localstorage"
      authorizationParams={{
        redirect_uri: window.location.origin
    }}>
      <LoadScript googleMapsApiKey="AIzaSyCZpLyl5Q2hyMNM-AnuDfsKfRCr_lTl6vA">
        <App />
      </LoadScript>
   
    </Auth0Provider>
   
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
