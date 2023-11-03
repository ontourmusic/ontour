import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import button_styles from "../Styles/button_styles";

const SettingsButton = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth0();
  const navigateToSettings = () => {
    console.log(user['https://tourscout.com/user_metadata']);
    if(isAuthenticated && user && user['https://tourscout.com/user_metadata'].artist_id) {
      navigate('account');
    } else {
      navigate('profile');
    }
  }

  return (
    <button style={button_styles.settingsButton} onClick={navigateToSettings}>
      Settings/Dashboard
    </button>
  );
};

export default SettingsButton;
