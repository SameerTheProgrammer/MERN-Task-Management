import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./../components/sidebar/Sidebar";
import { Box, Flex } from "@chakra-ui/react";
import { useAppSelector } from "../store/hooks";

const HomeLayout = () => {
  const user = useAppSelector((state) => state.user);
  if (!user || !user.id || !user.name || !user.email) {
    return <Navigate to={"/auth/login"} replace={true} />;
  }
  return (
    <Flex direction={"row"}>
      <Sidebar />
      <Box w={"100%"} p={"20px"} bgColor={"gray.100"} pt={"25px"}>
        <Outlet />
      </Box>
    </Flex>
  );
};

export default HomeLayout;
