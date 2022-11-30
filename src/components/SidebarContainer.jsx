export const SidebarContainer = (props) => {
  return (
    <div className="sidebar-container">
      <div></div>
      <div className="sidebar-container-main">{props.children}</div>
    </div>
  );
};
