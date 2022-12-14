export const TestingSidebar = () => {
  return (
    <nav className="testing-sidebar">
      <div className="testing-sidebar-title">
        <h2>this is title</h2>
        <div className="testing-sidebar-title-options">
          this might be a <button>button</button>
          or a <select>select</select>
        </div>
      </div>

      <div className="testing-sidebar-search">
        <input type="text" placeholder="this is search" />
      </div>

      <div className="testing-sidebar-list">this is the list</div>
    </nav>
  );
};
