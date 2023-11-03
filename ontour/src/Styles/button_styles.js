import common_styles from "./common_styles";
import OnTourColors from "./colors";

const two_column_button = {
  container: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(0, 0, 0, 0.25)",
    borderRadius: common_styles.borderRadius.button,
    backgroundColor: OnTourColors.palette.primary.main,
    color: OnTourColors.colors.onBackground,
    fontSize: "1rem",
    padding: "0.3rem 1rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  icon: {
    marginRight: "0.5rem",
  },
  text: {
    display: "inline-block",
    maxWidth: "calc(100% - 1rem)",
  },
};

const loginButton = {
  backgroundColor: "transparent",
  borderColor: "white",
  borderRadius: "5px",
  color: "white",
  width: "fit-content",
  fontWeight: "bold",
  fontSize: "14px"
}

const settingsButton = {
  backgroundColor: "transparent",
  borderColor: "white",
  borderRadius: "5px",
  color: "white",
  width: "fit-content",
  fontWeight: "bold",
  fontSize: "14px",
  marginRight: "5px",
}

const button_styles = {
  two_column_button,
  loginButton,
  settingsButton,
};

export default button_styles;
