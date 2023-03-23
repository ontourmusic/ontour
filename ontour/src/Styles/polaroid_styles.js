import OnTourColors from "./colors";
import common_styles from "./common_styles";

const polaroid_image = {
  width: "fit-content",
  padding: "5px",
  // width: "100%",
  height: "275px",
  objectFit: "cover",
  borderRadius: common_styles.borderRadius.default,
};
const polaroid_image_inner = {
  width: "100%",
  height: "275px",
  objectFit: "cover",
};

const polaroid_background = {
  backgroundColor: OnTourColors.colors.surface,
  borderRadius: common_styles.borderRadius.default,
};
const polaroid_container = {
  hight: "100%",
  padding: "5px",
};

const polaroid_styles = {
  polaroid_image,
  polaroid_background,
  polaroid_image_inner,
  polaroid_container,
};

export default polaroid_styles;
