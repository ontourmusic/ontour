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


function FanAnalytics() {
  
    const { isAuthenticated, user } = useAuth0();
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
      if (isAuthenticated && user && user.email) {
          setUserEmail(user.email);
      }
    }, [user, isAuthenticated]);



    const supabase = createClient('https://zouczoaamusrlkkuoppu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvdWN6b2FhbXVzcmxra3VvcHB1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODE1ODUyMSwiZXhwIjoxOTkzNzM0NTIxfQ.LTuL_u0tzmsj8Zf9m6JXN4JivwLq1aRXvU2YN-nDLCo');
    


    useEffect(() => {

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
