import { Outlet } from "react-router-dom";
import { useSelfDataQuery } from "../store/userApi";
import { useAppDispatch } from "./../store/hooks";
import { setUser } from "../store/userSlice";
import { useEffect } from "react";
import FullBodySpinner from "../components/FullBodySpinner";

const RootLayout = () => {
  const dispatch = useAppDispatch();
  const response = useSelfDataQuery(undefined);

  useEffect(() => {
    if (response.data) {
      const { _id: id, name, email } = response.data.user;
      dispatch(setUser({ id, name, email }));
    }
  }, [dispatch, response.data]);

  if (response.isLoading) {
    return <FullBodySpinner />;
  }

  return <Outlet />;
};
export default RootLayout;
