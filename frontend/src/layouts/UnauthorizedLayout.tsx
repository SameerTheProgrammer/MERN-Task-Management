import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const UnauthorizedLayout = () => {
  const user = useAppSelector((state) => state.user);
  if (user && user.id && user.name && user.email) {
    return <Navigate to={"/"} replace={true} />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default UnauthorizedLayout;
