import NavBar from './NavBar';

const Layout = (props: any) => {
  return (
    <div className="layout">
      <NavBar />
      <div className="content">{props.children}</div>
    </div>
  );
};

export default Layout;
