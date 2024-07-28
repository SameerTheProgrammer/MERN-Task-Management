import { Outlet } from "react-router-dom";

const UnauthorizedLayout = () => {
  return (
    <div>
      UnauthorizedLayout
      <Outlet />
    </div>
  );
};

export default UnauthorizedLayout;
