// implementation based on: https://codesandbox.io/s/collapsible-sidebar-nj5x6
//    and on: https://codesandbox.io/s/react-right-sidebar-pd7oy

import React from 'react';

const SideBar = (props) => {
  const sidebarClass = props.isOpen ? 'sidebar open' : 'sidebar';
  return <div className={sidebarClass}>{props.data}</div>;
};
export default SideBar;