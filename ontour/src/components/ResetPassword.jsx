import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import button_styles from "../Styles/button_styles"

const ResetPassword = () => {
    const { loginWithRedirect } = useAuth0();
    const [email, setEmail] = useState('');
    const apiURL = "https://dev-uujtiin6xxo47cy3.us.auth0.com/";
    const handleResetPassword = async () => {
        try {
            const body = {
                email: email,
                connection: 'Username-Password-Authentication'
            }
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkxVUUJ1U0liRDB3WmIzNWUxNXFpaSJ9.eyJpc3MiOiJodHRwczovL2Rldi11dWp0aWluNnh4bzQ3Y3kzLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJ1S2czNGxlaUZ1eFdBZEE3RmM5dU1JN3ZicWFoTkxJV0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtdXVqdGlpbjZ4eG80N2N5My51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY5ODEwMDQzMSwiZXhwIjoxNjk4MTg2ODMxLCJhenAiOiJ1S2czNGxlaUZ1eFdBZEE3RmM5dU1JN3ZicWFoTkxJVyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.bP-d8QpqYUhyf7LYDw_ZJsg-fjyE4xjzp6zY2904SFriny65v-wApcOmyexdE7XFnFJI7rgBbHEE0OCfDS20jolNRWxEibMODTU-LOhtBaVcci5K9YAPag-QBG8yj6RzPPuRvF_UYFyIraDcRYOMZzqfSTz-AgqTtrng_8SC1_GG9ZCH02-kiw3Z39OHb8s_PVFahd5Dvp1mwj9YuJMJSWplckQ_olR_yuW8qKX63rQ8HyQ_SBsN5pBLxuj_O1OnvSiHfho5Y8o5ezoyOjqdmLEZz4P4Q0lwBhkoPmm4tSFyiDkZo3uCp7kUFV1DqZZA3Q-wfFI5aegw8YkjTsGj0w"
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
            <h4>Reset Password</h4>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleResetPassword}>Reset Password</button>
        </div>
    );
};

export default ResetPassword;