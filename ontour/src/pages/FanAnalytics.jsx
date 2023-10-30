import React, { useEffect, useState } from 'react';
import "../index.css";
import "react-multi-carousel/lib/styles.css"; 
import { Helmet } from "react-helmet";
import { useAuth0 } from "@auth0/auth0-react";
import { Grid, TextField, Button} from "@mui/material";

import Navigation from "../Navigation";
//import BusinessSidebar from "../components/BusinessSidebar";
import SideContent from "../components/SideContent";
import Footer from "../components/Footer";
import ExternalLink from "../components/ExternalLink";
//import ResetPassword from '../components/ResetPassword';
import { createClient } from '@supabase/supabase-js';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';


function FanAnalytics() {
  
    const { isAuthenticated, user } = useAuth0();
    const [userEmail, setUserEmail] = useState("");
    const propertyId = '359931760';
    const startDate = 'yyyy-mm-dd';
    const endDate = 'yyyy-mm-dd';

    const googleLogin = useGoogleLogin({
        onSuccess: async tokenResponse => {
          console.log(tokenResponse);
          // fetching userinfo can be done on the client or the server
          const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
            }).then(res => res.data);
         console.log(userInfo);
        },
        });
        

    /** useEffect(() => {
      if (isAuthenticated && user && user.email) {
          setUserEmail(user.email);
      }
    }, [user, isAuthenticated]); **/

    useEffect( () => {
      }, [googleLogin.tokenResponse] );

    //create function to get google api info 

    console.log("returned API json");


    const supabase = createClient('https://zouczoaamusrlkkuoppu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvdWN6b2FhbXVzcmxra3VvcHB1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODE1ODUyMSwiZXhwIjoxOTkzNzM0NTIxfQ.LTuL_u0tzmsj8Zf9m6JXN4JivwLq1aRXvU2YN-nDLCo');
    

    useEffect(() => {
        console.log('tester');
    }, []);

    return (
        <>
            <Helmet>
            </Helmet>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Navigation navbar={false}/>
                </Grid>
                <Grid item xs={12} md={3}>
                </Grid>
                <Grid item xs={12}>
                    <hr id="artist-footer"></hr>
                    <Footer />
                </Grid>
            </Grid >
        </>
    );
}
export default FanAnalytics;