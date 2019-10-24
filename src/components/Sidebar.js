import React, { useState, useMemo } from "react";

import "./styles/Sidebar.scss";

function Sidebar(props) {
  const { children } = props;

  const [showing, setShowing] = useState(false);
  const toggleShowing = () => setShowing(!showing);

  const [selectedIndex, setSelected] = useState(0);

  const activeMeta = [];

  function handleIconClick(index) {
    if (index === selectedIndex) toggleShowing();
    else setSelected(index);
  }

  function ActiveChildElement() {
    const count = React.Children.count(children);
    return count === 0 ? null : count === 1 ? children : children[selectedIndex];
  }

  useMemo(
    () =>
      React.Children.forEach(children, (child, i) => {
        if (!React.isValidElement(child)) return;

        activeMeta.push({ index: i, Icon: child.props.icon, title: child.props.title });
      }),
    [children, activeMeta]
  );

  return (
    <div className={`sidebar ${showing ? "" : "minimized"}`}>
      <div className="icons">
        {activeMeta.map(({ index, Icon }) => {
          return (
            <div className="icon" key={`Sidebar/Icon/${index}`} onClick={() => handleIconClick(index)}>
              <Icon />
            </div>
          );
        })}
      </div>
      <div className={`sidebar-inner ${showing ? "" : "fade"}`}>
        <div className="title">{activeMeta[selectedIndex].title}</div>
        {<ActiveChildElement />}
      </div>
    </div>
  );
}

export default Sidebar;