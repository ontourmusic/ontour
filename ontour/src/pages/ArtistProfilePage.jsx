import React, { useEffect, useState } from 'react';
import "../index.css";
import "react-multi-carousel/lib/styles.css"; 
import { Helmet } from "react-helmet";
import { useAuth0 } from "@auth0/auth0-react";
import { Grid, TextField, Button } from "@mui/material";
import Navigation from "../Navigation";
import Footer from "../components/Footer";
import ResetPassword from '../components/ResetPassword';

function ArtistProfilePage() {
    const { isAuthenticated, user } = useAuth0();
    const [userEmail, setUserEmail] = useState("");
    const [username, setUsername] = useState("");
    const [officialProfileName, setOfficialProfileName] = useState("");

    useEffect(() => {
        if (isAuthenticated && user && user.email) {
            setUserEmail(user.email);
            if (user['https://tourscout.com/user_metadata'] && user['https://tourscout.com/user_metadata'].username) {
                setUsername(user['https://tourscout.com/user_metadata'].username);
                setOfficialProfileName(user['https://tourscout.com/user_metadata'].username);
            }
        }
        console.log(user);
    }, [user, isAuthenticated]);

    // Handler for when the Edit button is clicked
    const handleEditProfile = () => {
        // Logic to handle profile editing
        console.log('Edit Profile clicked');
    };

    return (
        <>
            <Helmet />
            <Grid container spacing={1} justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                <Grid item xs={12}>
                    <Navigation navbar={false}/>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Grid container spacing={4} direction="column" sx={{ padding: '10px' }}>
                        <Grid item xs={12} container justifyContent="center">
                            <Grid item xs={6}>
                                <TextField 
                                fullWidth
                                label="Email"
                                variant="outlined" 
                                value={userEmail}
                                disabled // assuming the email should not be editable
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <ResetPassword />
                            </Grid>
                        </Grid>
    
                        <Grid item xs={12} container justifyContent="center">
                            <Grid item xs={9}>
                                <TextField 
                                fullWidth
                                label="Official Profile Name" 
                                variant="outlined" 
                                value={officialProfileName}
                                onChange={(e) => { 
                                    setOfficialProfileName(e.target.value); 
                                }}
                                />
                            </Grid>
                            {/* Edit button for editing profile */}
                            <Grid item>
                                <Button variant="contained" color="primary" onClick={handleEditProfile}>
                                    Edit Profile
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                
                <Grid item xs={12}>
                    <hr id="artist-footer" />
                    <Footer />
                </Grid>
            </Grid >
        </>
    );
}

export default ArtistProfilePage;
