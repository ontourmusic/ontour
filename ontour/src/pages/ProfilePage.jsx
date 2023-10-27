import React, { useEffect, useState } from 'react';
import "../index.css";
import "react-multi-carousel/lib/styles.css"; 
import { Helmet } from "react-helmet";
import { useAuth0 } from "@auth0/auth0-react";
import { Grid, TextField, Button} from "@mui/material";

import Navigation from "../Navigation";
import BusinessSidebar from "../components/BusinessSidebar";
import SideContent from "../components/SideContent";
import Footer from "../components/Footer";
import ResetPassword from '../components/ResetPassword';


function ProfilePage() {
    const { isAuthenticated, user } = useAuth0();
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
      if (isAuthenticated && user && user.email) {
          setUserEmail(user.email);
      }
    }, [user, isAuthenticated]);

    return (
        <>
            <Helmet></Helmet>
            <Grid container spacing={1} justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                <Grid item xs={12}>
                    <Navigation navbar={false}/>
                </Grid>
                <Grid item xs={12} md={8}> {/* Adjusted width for better centering */}
                    <Grid container spacing={4} direction="column" sx={{ padding: '10px' }}>
                        <Grid item xs={12} container justifyContent="center">
                            <Grid item xs={9}>
                                <TextField 
                                fullWidth
                                label="Email"
                                variant="outlined" 
                                value={userEmail}
                                onChange={(e) => { 
                                    setUserEmail(e.target.value); 
                                }}
                                />
                            </Grid>
                        </Grid>
    
                        <Grid item xs={12} container justifyContent="center">
                            <Grid item xs={6}>
                                <TextField 
                                fullWidth
                                label="Password" 
                                type="password" 
                                variant="outlined" 
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <ResetPassword></ResetPassword>
                            </Grid>
                        </Grid>
    
                        <Grid item xs={12} container ="center" justifyContent="center">
                            <Grid item xs={9}>
                                <TextField 
                                fullWidth
                                label="Official Profile Name" 
                                variant="outlined" 
                                />
                            </Grid>
                            {/* <Grid item xs={3}>
                                <Button variant="text">Request Edit Access</Button>
                            </Grid> */}
                        </Grid>
                    </Grid>
                </Grid>
                
                <Grid item xs={12}>
                    <hr id="artist-footer"></hr>
                    <Footer />
                </Grid>
            </Grid >
        </>
    );
    

}
export default ProfilePage;