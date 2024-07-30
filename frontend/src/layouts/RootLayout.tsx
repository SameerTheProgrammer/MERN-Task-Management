import { Outlet } from "react-router-dom";
import { useSelfDataQuery } from "../store/userApi";
import { useAppDispatch } from "./../store/hooks";
import { setUser } from "../store/userSlice";
import { useEffect } from "react";
import { Skeleton, Spinner, Stack } from "@chakra-ui/react";

const RootLayout = () => {
  const dispatch = useAppDispatch();
  const response = useSelfDataQuery(undefined);
  console.log({ ...response.data?.user });

  useEffect(() => {
    if (response.data) {
      const { _id: id, name, email } = response.data.user;
      dispatch(setUser({ id, name, email }));
    }
  }, [dispatch, response.data]);

  if (response.isLoading) {
    return (
      <div>
        <Stack>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </div>
    );
  }

  return <Outlet />;
};
export default RootLayout;
