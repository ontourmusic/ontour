import OnTourColors from "./colors";

const ResultsCard = {
  container: {
    display: "flex",
    height: "min(300px, 20vh)",
    backgroundColor: OnTourColors.palette.tertiary.dark5,
    color: OnTourColors.palette.secondary.contrastText,
  },
  starBox: {
    display: "flex",
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
};

export default results_styles;
