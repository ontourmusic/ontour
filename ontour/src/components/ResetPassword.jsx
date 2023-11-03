import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import {Button} from '@mui/material';
import button_styles from "../Styles/button_styles"

const ResetPassword = () => {
    // const { loginWithRedirect } = useAuth0();
    const { user } = useAuth0();
    
    // const [email, setEmail] = useState('');
    const apiURL = "https://dev-uujtiin6xxo47cy3.us.auth0.com/";
    const handleResetPassword = async () => {
        try {
            // const accessToken = await getAccessTokenSilently();
            // console.log(accessToken);
            // const opt = {
            //     method: 'GET',
            //     headers: {
            //         'Authorization': 'Bearer ' + accessToken,
            //     }
            // }
            // const userInfo = await fetch(apiURL + 'userinfo', opt)
            console.log(user.email);
            // console.log(userInfo);
            const body = {
                email: user.email,
                connection: 'Username-Password-Authentication'
            }
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization' : 'Bearer ' + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkxVUUJ1U0liRDB3WmIzNWUxNXFpaSJ9.eyJpc3MiOiJodHRwczovL2Rldi11dWp0aWluNnh4bzQ3Y3kzLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJ1S2czNGxlaUZ1eFdBZEE3RmM5dU1JN3ZicWFoTkxJV0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtdXVqdGlpbjZ4eG80N2N5My51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY5ODEwMDYwNywiZXhwIjoxNjk4MTg3MDA3LCJhenAiOiJ1S2czNGxlaUZ1eFdBZEE3RmM5dU1JN3ZicWFoTkxJVyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.rJta545eXgxIgLu-_PlvdlSqPRLpR2pNjFSzCQ5X-M-zhhyUdyJ5xtHxdKcLtBtJoElzjrR9jHmn7NnGjZhDRDid0g6Bmb6xz4ojKk-PvoMRB59vS5AqGGPFoZQTKTHY_Z_xsconC4PuIZKchX9CAiLGrtCi2tHpc5tBfEiyu-xsHM8FI_EjhhlHakLu4qUx1Pl-9bBfPMn-i-vUqEQIzUSCMzSyOyXF9tNUFsm7i_yGxPCB5D-s-OYdYYfr2wQKCulIGJVl24oIFIiJ1djvMoKoW0v_Q0pal02QY4otTSGjIrVAs8K9b_WxLOFZfhC-qukllQIPBx_-BXn4-p7Ppw",
                },
                body: JSON.stringify(body)
            };
            console.log(options);
            const response = await fetch(apiURL + 'dbconnections/change_password', options);
            console.log(response);
            console.log('Password change request sent successfully');
        } catch (error) {
            console.log('error');
            console.error('Error changing password:', error);
        }
    };
    
    return (
        <div>
            {/* <h4>Reset Password</h4>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            /> */}
            <Button variant="contained" color="primary" onClick={handleResetPassword}>
            Reset Password
            </Button>
            {/* <button onClick={handleResetPassword}>Reset Password</button> */}
        </div>
    );
};

export default ResetPassword;