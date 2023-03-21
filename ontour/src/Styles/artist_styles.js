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
    }
  },
  review: {
    container: common_styles.list_group.list_group_container,
    item: common_styles.list_group.list_group_item,
  },
};

const artist_styles = {
  grid,
  sidebar,
  review_display,
};

export default artist_styles;
