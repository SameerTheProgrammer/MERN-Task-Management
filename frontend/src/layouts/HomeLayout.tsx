import { Outlet } from "react-router-dom";
import Sidebar from "./../components/sidebar/Sidebar";
import { Box, Flex } from "@chakra-ui/react";

const HomeLayout = () => {
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
