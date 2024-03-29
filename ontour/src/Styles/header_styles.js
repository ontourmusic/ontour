const button_position = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
};

const button = {
  // margin: "20px",
  marginBottom: "2rem",
  marginRight: "20px",
  marginLeft: "20px",
  // marginBottom: "2rem",
  // marginRight: "2rem",
  // marginLeft: "2rem",
  height: "50px",
  textTransform: "none",
  fontFamily: "Helvetica",
  fontWeight: "bold",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
};

const imageTile = {
  container: {
    height: "25vh",
    overflow: "hidden",
    position: "relative",
  },
  image: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    opacity: "1.0",
    display: "block",
    transition: "0.5s ease",
    backfaceVisibility: "hidden",
    cursor: "pointer",
  },
  imageHover: {
    filter: "brightness(50%)",
  },
  middle: {
    transition: "0.5s ease",
    opacity: 0,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    msTransform: "translate(-50%, -50%)",
    textAlign: "center",
  },
};

const header_styles = {
  button_position,
  button,
  imageTile,
};

export default header_styles;
