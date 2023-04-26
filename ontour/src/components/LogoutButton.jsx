import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import button_styles from "../Styles/button_styles"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import common_styles from "../Styles/common_styles";
const window_breakpoints = common_styles.window_breakpoints;

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <button style={button_styles.loginButton} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      <span>Log Out</span>
    </button>
  );
};

export default LogoutButton;