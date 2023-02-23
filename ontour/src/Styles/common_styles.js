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
  // list-group {
  //     --bs-list-group-color: #212529;
  //     --bs-list-group-bg: #fff;
  //     --bs-list-group-border-color: rgba(0, 0, 0, 0.125);
  //     --bs-list-group-border-width: 1px;
  //     --bs-list-group-border-radius: 0.375rem;
  //     --bs-list-group-item-padding-x: 1rem;
  //     --bs-list-group-item-padding-y: 0.5rem;
  //     --bs-list-group-action-color: #495057;
  //     --bs-list-group-action-hover-color: #495057;
  //     --bs-list-group-action-hover-bg: #f8f9fa;
  //     --bs-list-group-action-active-color: #212529;
  //     --bs-list-group-action-active-bg: #e9ecef;
  //     --bs-list-group-disabled-color: #6c757d;
  //     --bs-list-group-disabled-bg: #fff;
  //     --bs-list-group-active-color: #fff;
  //     --bs-list-group-active-bg: #0d6efd;
  //     --bs-list-group-active-border-color: #0d6efd;
  //     display: flex;
  //     flex-direction: column;
  //     padding-left: 0;
  //     margin-bottom: 0;
  //     border-radius: var(--bs-list-group-border-radius);
  //     border-top-left-radius: ;
  //     border-top-right-radius: ;
  //     border-bottom-right-radius: ;
  //     border-bottom-left-radius: ;
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

export const common_styles = {
  borderRadius,
  list_group,
};

export default common_styles;
