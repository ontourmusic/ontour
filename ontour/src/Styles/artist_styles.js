import common_styles from "./common_styles";
import OnTourColors from "./colors";

const grid = {
  body_container: {
    margin: "10px 1vw 0 1vw",
  },
};

const sidebar = {
  box: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  icon_container: {
    display: "flex",
    flexDirection: "space-between",
  },
};

const carousel = {
  titleBar: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: "5px",
  },
  container: {},
  slide: {
    margin: "0 4px 0 4px",
  },
};

const modal = {
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "min(1800px, 80vw)",
    height: "min(1000px, 80vh)",
    bgcolor: OnTourColors.palette.primary.main,
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
  },
  innerGrid: {
    width: '100%', 
    height: '100%',
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    objectFit: "contain",
  },
};

const review_display = {
  paginated_div: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxSizing: "border-box",
    width: "100%",
    height: "100%",
  },
  page_arrow: {
    fontSize: 18,
    width: 50,
    color: "black",
  },
  summary: {
    barContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    leftContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    starBox: {
      margin: "2px 0 2px 0",
      display: "flex",
      // fontSize: 18,
    },
  },
  review: {
    container: common_styles.list_group.list_group_container,
    item: common_styles.list_group.list_group_item,
  },
};

const header = {
  Background: {
    backgroundRepeat: "noRepeat",
    // backgroundPosition: "center",
    backgroundSize: "cover",
    height: "40vh",
    position: "relative",
  },
  Container: {
    // height: "fit-content",
    // bottom: "0%",
    // left: "0%",
    maxWidth: "min(100%, 700px)",
    // paddingBottom: "4%",
    paddingBottom: "2rem",
    paddingLeft: "4%",
    // paddingTop: "75%",
    // paddingTop: "4%",
  },
  Mobile: {
    background: "linearGradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))",
  },
  Desktop: {
    background: "",
  },
  StarsIcon: {
    opacity: 1,
    color: "white",
  },
  RatingRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  Divider: {
    backgroundColor: "white",
    height: "2px",
    margin: "auto",
    marginTop: "0.4rem",
    marginBottom: "0.4rem",
  },
  TotalReviewsText: {
    height: "100%",
    color: "white",
    position: "center",
  },
  ArtistName: {
    inlineSize: "auto",
    // overflowWrap: "break-word",
    textAlign: "left",
    color: "white",
  },
};

const artist_styles = {
  header,
  grid,
  sidebar,
  review_display,
  carousel,
  modal,
};

export default artist_styles;
