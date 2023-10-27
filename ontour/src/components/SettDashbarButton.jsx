import React from "react";
import { useNavigate } from "react-router-dom";
import button_styles from "../Styles/button_styles";

const SettingsButton = () => {
  const navigate = useNavigate();

  const navigateToSettings = () => {
    navigate('Account');
  }

  return (
    <button style={button_styles.settingsButton} onClick={navigateToSettings}>
      Settings/Dashboard
    </button>
  );
};

export default SettingsButton;
