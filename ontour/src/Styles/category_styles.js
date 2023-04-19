import OnTourColors from "./colors";

const container = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "200px",
    width: "100%",
    // backgroundColor: OnTourColors.palette.tertiary.main,
    opacity: 0.85,
    "&:hover": {
        opacity: 1,
        backgroundColor: OnTourColors.palette.tertiary.dark2,
    },
};
const icon = {
    width: 50,
    height: 50,
    paddingBottom: 5
};
const content = {
};
const text = {
    color: "white",
}
const iconText = {
    color: "black",
}

const category_styles = {
    container,
    icon,
    content,
    text,
    iconText,
};

export default category_styles;