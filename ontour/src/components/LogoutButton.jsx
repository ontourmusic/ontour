import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import button_styles from "../Styles/button_styles"

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <button style={button_styles.loginButton} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      <span>Log Out</span>
    </button>
  );
};

export default LogoutButton;