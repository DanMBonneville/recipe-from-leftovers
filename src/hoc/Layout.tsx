import NavBar from './NavBar';

const Layout = (props: any) => {
  return (
    <div className="layout-background">
      <NavBar />
      {props.children}
    </div>
  );
};

export default Layout;
