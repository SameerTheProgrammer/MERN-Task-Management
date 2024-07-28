import { Outlet } from "react-router-dom";
import Sidebar from "./../components/sidebar/Sidebar";
import { Box, Flex } from "@chakra-ui/react";

const HomeLayout = () => {
  return (
    <Flex direction={"row"}>
      <Sidebar />
      <Box w={"100%"} p={"10px"} bgColor={"gray.100"}>
        <Outlet />
      </Box>
    </Flex>
  );
};

export default HomeLayout;
