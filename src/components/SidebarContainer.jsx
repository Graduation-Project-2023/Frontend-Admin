export const SidebarContainer = (props) => {
  return (
    <div className="student-container">
      <div></div>
      <div className="student-container-main">{props.children}</div>
    </div>
  );
};
