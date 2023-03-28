import common_styles from "./common_styles";

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
  container: {},
  slide: {
    margin: "0 4px 0 4px",
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
      fontSize: 18,
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
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "40vh",
    position: "relative",
  },
  Container: {
    // height: "fit-content",
    // bottom: "0%",
    // left: "0%",
    maxWidth: "calc(min(100%, 500px) - 4%)",
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
    overflowWrap: "break-word",
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
};

export default artist_styles;
