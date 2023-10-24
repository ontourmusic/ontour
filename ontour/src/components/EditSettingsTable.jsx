import React, { useState, useEffect} from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { useAuth0 } from "@auth0/auth0-react";
import ResetPassword from './ResetPassword';

// const EditSettingsTable = () => {
//   return (
//     <Grid container spacing={4} direction="column" sx={{padding:'20px'}}>
//       <Grid item xs={12}>
//         <TextField fullWidth label="Email" variant="outlined" defaultValue="taylor.swift@gmail.com" />
//       </Grid>

//       <Grid item xs={12}>
//         <TextField fullWidth label="Password" type="password" variant="outlined" />
//       </Grid>

//       <Grid item xs={12}>
//         <TextField fullWidth label="Official Profile Name" variant="outlined" />
//         <Button variant="text">Request Edit Access</Button>
//       </Grid>
//       <Grid item xs={12}>
//         <Button variant="contained" color="primary"> Save Changes</Button>
//       </Grid>
//     </Grid>
//   );
// }

const EditSettingsTable = () => {
    const { isAuthenticated, user } = useAuth0();
   // const initialEmail = isAuthenticated ? user.email : '';
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
      if (isAuthenticated && user && user.email) {
          setUserEmail(user.email);
      }
    }, [user, isAuthenticated]);

    return (
      <Grid container spacing={4} direction="column" sx={{ padding: '20px' }}>
        
        <Grid item xs={12} container>
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
  
        <Grid item xs={12} container>
          <Grid item xs={9}>
            {/* <TextField 
              fullWidth
              label="Password" 
              type="password" 
              variant="outlined" 
            /> */}
            <ResetPassword></ResetPassword>
          </Grid>
        </Grid>
  
        <Grid item xs={12} container alignItems="center">
          <Grid item xs={9}>
            <TextField 
              fullWidth
              label="Official Profile Name" 
              variant="outlined" 
            />
          </Grid>
          <Grid item xs={3}>
            <Button variant="text">Request Edit Access</Button>
          </Grid>
        </Grid>
  
        <Grid item xs={12}>
          <Button variant="contained" color="primary">
            Save Changes
          </Button>
        </Grid>
      </Grid>
    );
  }

export default EditSettingsTable;
