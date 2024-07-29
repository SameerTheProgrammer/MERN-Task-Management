import React, { useState } from "react";
import {
  Flex,
  Divider,
  Avatar,
  Heading,
  Icon,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { FiHome, FiSettings } from "react-icons/fi";
import { IoSunnyOutline } from "react-icons/io5";
import NavItem from "./NavItem";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdNotificationsOutline,
} from "react-icons/io";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { CiViewBoard } from "react-icons/ci";
import { GoGraph, GoPeople } from "react-icons/go";

const Sidebar: React.FC = () => {
  const [navSize, changeNavSize] = useState<"small" | "large">("large");

  return (
    <div>
      <Flex
        h="100vh"
        left={0}
        boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
        w={navSize === "small" ? "75px" : "225px"}
        flexDir="column"
        justifyContent={"space-between"}
        pt={navSize === "small" ? 5 : 0}
        p={navSize === "small" ? 2 : 0}
      >
        <div>
          <Flex
            p="5%"
            flexDir="column"
            w="100%"
            alignItems={navSize === "small" ? "center" : "flex-start"}
            mb={1}
          >
            <Flex mt={5} align="center">
              <Avatar size="sm" src="avatar-1.jpg" />
              <Flex
                flexDir="column"
                ml={4}
                display={navSize === "small" ? "none" : "flex"}
              >
                <Heading as="h3" size="sm">
                  Sylwia Weller
                </Heading>
              </Flex>
            </Flex>
            <Flex
              mt={3}
              mb={3}
              w="100%"
              align="center"
              display={navSize === "small" ? "none" : "flex"}
              justifyContent={"space-between"}
            >
              <Flex gap={2}>
                <Icon as={IoMdNotificationsOutline} fontSize={"larger"} />
                <Icon as={IoSunnyOutline} fontSize={"larger"} />
                <Icon as={MdKeyboardDoubleArrowRight} fontSize={"larger"} />
              </Flex>
              <Flex>
                <Button colorScheme="gray" variant="solid" size="xs">
                  <Icon
                    as={FaArrowRightFromBracket}
                    fontSize={"medium"}
                    mr={1}
                  />
                  Logout
                </Button>
              </Flex>
            </Flex>
            <Divider display={navSize === "small" ? "none" : "flex"} />
          </Flex>
          <Flex
            p="5%"
            flexDir="column"
            w="100%"
            alignItems={navSize === "small" ? "center" : "flex-start"}
            as="nav"
          >
            <NavItem
              path="/"
              navSize={navSize}
              icon={FiHome}
              title="Dashboard"
              active
            />
            <NavItem
              path="/boards"
              navSize={navSize}
              icon={CiViewBoard}
              title="Boards"
            />
            <NavItem
              path="/"
              navSize={navSize}
              icon={FiSettings}
              title="Settings"
            />
            <NavItem path="/" navSize={navSize} icon={GoPeople} title="Teams" />
            <NavItem
              path="/"
              navSize={navSize}
              icon={GoGraph}
              title="Analytics"
            />
          </Flex>
        </div>
        <Flex
          bgColor={"gray.100"}
          align={"center"}
          justifyContent={"center"}
          onClick={() => changeNavSize(navSize === "small" ? "large" : "small")}
        >
          <IconButton
            background="none"
            size="lg"
            fontSize="25px"
            _hover={{ background: "none" }}
            icon={
              navSize === "small" ? <IoIosArrowForward /> : <IoIosArrowBack />
            }
            aria-label="Toggle Navigation Size"
          />
        </Flex>
      </Flex>
    </div>
  );
};

export default Sidebar;
