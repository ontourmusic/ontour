const borderRadius = {
  default: "10px",
  large: "20px",
  button: "5px",
};

const list_group_vars = {
  color: "#212529",
  backgroundColor: "#fff",
  borderColor: "rgba(0, 0, 0, 0.125)",
  borderWidth: "1px",
  borderRadius: "0.375rem",
  itemPaddingX: "1rem",
  itemPaddingY: "0.5rem",
  actionColor: "#495057",
  actionHoverColor: "#495057",
  actionHoverBg: "#f8f9fa",
  actionActiveColor: "#212529",
  actionActiveBg: "#e9ecef",
  disabledColor: "#6c757d",
  disabledBg: "#fff",
  activeColor: "#fff",
  activeBg: "#0d6efd",
  activeBorderColor: "#0d6efd",
};
const list_group = {
  list_group_container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
  },
  list_group_item: {
    position: "relative",
    display: "block",
    padding: `${list_group_vars.itemPaddingY} ${list_group_vars.itemPaddingX}`,
    color: list_group_vars.color,
    backgroundColor: list_group_vars.backgroundColor,
    border: `${list_group_vars.borderWidth} solid ${list_group_vars.borderColor}`,
  },
};

const window_breakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

export const common_styles = {
  window_breakpoints,
  borderRadius,
  list_group,
};

export default common_styles;
