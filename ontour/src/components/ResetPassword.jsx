import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import {Button} from '@mui/material';
import button_styles from "../Styles/button_styles"

const ResetPassword = () => {
    // const { loginWithRedirect } = useAuth0();
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [userMetadata, setUserMetadata] = useState(null);

    const [email, setEmail] = useState('');
    const apiURL = "https://dev-uujtiin6xxo47cy3.us.auth0.com";
    const handleResetPassword = async () => {
        try {
            // const userid = user.sub.split('|')[1];
            // console.log('metadataResponse');
            // const accessToken = await getAccessTokenSilently({
            //     authorizationParams: {
            //       audience: `https://dev-uujtiin6xxo47cy3.us.auth0.com/api/v2/`,
            //       scope: "read:current_user",
            //     },
            //   });
            //   console.log('metadataResponse');
            //   const userDetailsByIdUrl = `https://dev-uujtiin6xxo47cy3.us.auth0.com/api/v2/users/${user.sub}`;

            //   const metadataResponse = await fetch(userDetailsByIdUrl, {
            //     headers: {
            //       Authorization: `Bearer ${accessToken}`,
            //     },
            //   });
            //   console.log(metadataResponse);
            // console.log(user);
            // console.log('token ' + accessToken);
            // const b = {
            //     email: user.email,
            // }


            // const clientID = 'uKg34leiFuxWAdA7Fc9uMI7vbqahNLIW';
            // const clientSecret = 'yOt1486_enjorpvpBeK8NqYTNyjHYnXK2T7W63ac1IL_BizZmKV1lRvUm03ARM5v';
            // const dataopt = {
            //     grant_type: 'client_credentials',
            //     client_id: clientID,
            //     client_secret: clientSecret,
            //     audience: apiURL + 'api/v2/'
            //   }

            // const options = {
            //     method: 'POST',
            //     headers: {'content-type': 'application/json'},
            //     body: JSON.stringify({
            //         client_id: 'uKg34leiFuxWAdA7Fc9uMI7vbqahNLIW',
            //         client_secret: 'yOt1486_enjorpvpBeK8NqYTNyjHYnXK2T7W63ac1IL_BizZmKV1lRvUm03ARM5v',
            //         audience: 'https://dev-uujtiin6xxo47cy3.us.auth0.com/api/v2/',
            //         grant_type: 'client_credentials',
            //       }),
        
            // };
            // const req = await fetch('https://dev-uujtiin6xxo47cy3.us.auth0.com/oauth/token', options);
            // console.log(req);
            

            const tok = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkxVUUJ1U0liRDB3WmIzNWUxNXFpaSJ9.eyJpc3MiOiJodHRwczovL2Rldi11dWp0aWluNnh4bzQ3Y3kzLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJ1S2czNGxlaUZ1eFdBZEE3RmM5dU1JN3ZicWFoTkxJV0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtdXVqdGlpbjZ4eG80N2N5My51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY5ODM4OTAzNywiZXhwIjoxNjk4NDc1NDM3LCJhenAiOiJ1S2czNGxlaUZ1eFdBZEE3RmM5dU1JN3ZicWFoTkxJVyIsInNjb3BlIjoicmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.ZEfB_ARWov0PGBnXsVS6ZC4IZR4gxmNc8jc1JMEe8whT00O3GMCL_s0XFzW5m0b-wR3tcAOHWrpiYWqF4vXoRjZ_wdBUMoNB4SuUiCZPksgOoFsZhg1cLvuttgD9mpWj5wBHoC-INNQyD4aRFE9sE_LCx07w_9ArfZSp60DpsgFAkmyr7A0YztDjS77oW7pviiTygL0tfvveknZzuIU90TFQ4omDLhjsgJ6xcsA0VcwWY8vVRTC1VE7-bMWwRKsaOuYijIu5Fx70pWV6hIvE2rF-0s-hOJe6TRVzrPhS9GnpKLTDYMkQ4aaBx3PFAY3JsyTBZXokKBQf8CBkwzlDhg'
            // console.log(req);
            const opt = {
                method: 'GET',
                headers: {
                    authorization: 'Bearer ' + tok
                },
            }
            const getAPI = 'https://dev-uujtiin6xxo47cy3.us.auth0.com/api/v2/users/' + user.sub;
            console.log(getAPI);
            console.log(opt);
            const userInfo = await fetch(getAPI, opt);
            // console.log('userInfo');
            console.log(userInfo);

            // console.log(userInfo);

            // console.log(user);
            // console.log(userInfo);
            // const body = {
            //     email: user.email,
            //     connection: 'Username-Password-Authentication'
            // }
            // const options = {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         // 'Authorization' : 'Bearer ' + "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkxVUUJ1U0liRDB3WmIzNWUxNXFpaSJ9.eyJpc3MiOiJodHRwczovL2Rldi11dWp0aWluNnh4bzQ3Y3kzLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJ1S2czNGxlaUZ1eFdBZEE3RmM5dU1JN3ZicWFoTkxJV0BjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9kZXYtdXVqdGlpbjZ4eG80N2N5My51cy5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY5ODEwMDYwNywiZXhwIjoxNjk4MTg3MDA3LCJhenAiOiJ1S2czNGxlaUZ1eFdBZEE3RmM5dU1JN3ZicWFoTkxJVyIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.rJta545eXgxIgLu-_PlvdlSqPRLpR2pNjFSzCQ5X-M-zhhyUdyJ5xtHxdKcLtBtJoElzjrR9jHmn7NnGjZhDRDid0g6Bmb6xz4ojKk-PvoMRB59vS5AqGGPFoZQTKTHY_Z_xsconC4PuIZKchX9CAiLGrtCi2tHpc5tBfEiyu-xsHM8FI_EjhhlHakLu4qUx1Pl-9bBfPMn-i-vUqEQIzUSCMzSyOyXF9tNUFsm7i_yGxPCB5D-s-OYdYYfr2wQKCulIGJVl24oIFIiJ1djvMoKoW0v_Q0pal02QY4otTSGjIrVAs8K9b_WxLOFZfhC-qukllQIPBx_-BXn4-p7Ppw",
            //     },
            //     body: JSON.stringify(body)
            // };
            // console.log(options);
            // const response = await fetch(apiURL + 'dbconnections/change_password', options);
            // console.log(response);
            // console.log('Password change request sent successfully');
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
    

    // useEffect(() => {
    //     const getUserMetadata = async () => {
    //       const domain = "dev-uujtiin6xxo47cy3.us.auth0.com";
      
    //       try {
    //         const accessToken = await getAccessTokenSilently({
    //           authorizationParams: {
    //             audience: `https://${domain}/api/v2/`,
    //             scope: "read:current_user",
    //           },
    //         });
      
    //         const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
      
    //         const metadataResponse = await fetch(userDetailsByIdUrl, {
    //           headers: {
    //             Authorization: `Bearer ${accessToken}`,
    //           },
    //         });
      
    //         const { user_metadata } = await metadataResponse.json();
      
    //         setUserMetadata(user_metadata);
    //       } catch (e) {
    //         console.log(e.message);
    //       }
    //     };
      
    //     getUserMetadata();
    //   }, [getAccessTokenSilently, user?.sub]);

    // return (
    //     isAuthenticated && (
    //       <div>
    //         <img src={user.picture} alt={user.name} />
    //         <h2>{user.name}</h2>
    //         <p>{user.email}</p>
    //         <h3>User Metadata</h3>
    //         {userMetadata ? (
    //           <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
    //         ) : (
    //           "No user metadata defined"
    //         )}
    //       </div>
    //     )
    //   );
    
};

export default ResetPassword;