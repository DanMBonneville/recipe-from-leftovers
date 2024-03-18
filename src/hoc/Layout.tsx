const Layout = (props: any) => {
  return (
    <div className="layout-background">
      <div className="layout-foreground">{props.children}</div>
    </div>
  );
};

export default Layout;
