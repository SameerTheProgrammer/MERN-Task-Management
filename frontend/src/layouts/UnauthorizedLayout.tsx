import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const UnauthorizedLayout = () => {
  const user = useAppSelector((state) => state.user);
  if (user !== null) {
    return <Navigate to={"/"} replace={true} />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default UnauthorizedLayout;
