import OnTourColors from "./colors";
import common_styles from "./common_styles";

const polaroid_image = {
  width: "fit-content",
  padding: "5px",
  borderRadius: common_styles.borderRadius.default,
};
const polaroid_image_inner = {
    width: "100%",
    height: "18vw",
    objectFit: "cover",
};

const polaroid_background = {
  backgroundColor: OnTourColors.colors.background,
  borderRadius: common_styles.borderRadius.default,
};

const polaroid_styles = {
  polaroid_image,
  polaroid_background,
  polaroid_image_inner
};

export default polaroid_styles;
