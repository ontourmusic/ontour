import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import button_styles from "../Styles/button_styles"

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button style={button_styles.loginButton} onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;