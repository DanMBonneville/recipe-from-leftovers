import React from 'react';
import NavBar from './NavBar';

const Layout = (props: any) => {
  return (
    <div className="layout">
      {/* <Favicon url="./src/scss/images/fridge-vector.icon.png" /> */}
      <NavBar />
      <div className="content">{props.children}</div>
    </div>
  );
};

export default Layout;
