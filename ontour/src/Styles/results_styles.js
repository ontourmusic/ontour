import OnTourColors from "./colors";
const ResultsPage = {
  bodyContainer: {
    padding: "0 max(5vw, 60px)",
  },
}
const ResultsCard = {
  container: {
    display: "flex",
    height: "min(350px, 20vh)",
    // backgroundColor: OnTourColors.palette.tertiary.dark5,
    borderTop: "1px solid #ccc",
    borderBottom: "1px solid #ccc",
    color: OnTourColors.palette.secondary.contrastText,
    borderRadius: "0px",
    boxShadow: "none",
    "&:hover": {
        boxShadow: "0 0 4px 4px rgba(0, 0, 0, 0.1)",
    },
  },
  starBox: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    pl: 2,
    pb: 1,
    width: "100%",
  },
  reviewCount: {
    fontSize: "1.5rem",
    marginLeft: "0.5rem",
    color: OnTourColors.palette.tertiary.dark1,
  },
};

const results_styles = {
  ResultsCard,
  ResultsPage,
};

export default results_styles;
