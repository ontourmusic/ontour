import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import button_styles from "../Styles/button_styles"

const ResetPassword = () => {
    const { loginWithRedirect } = useAuth0();
    const [email, setEmail] = useState('');
    const apiURL = "https://dev-uujtiin6xxo47cy3.us.auth0.com/api/v2/";
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