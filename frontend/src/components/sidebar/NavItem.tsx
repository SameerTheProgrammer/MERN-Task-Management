import React from "react";
import { Flex, Text, Icon, Link, Menu, MenuButton } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { Link as ReactRouterLink } from "react-router-dom";

interface NavItemProps {
  icon: IconType;
  title: string;
  active?: boolean;
  navSize: "small" | "large";
  path: string;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  title,
  active,
  navSize,
  path,
}) => {
  return (
    <Flex
      mt={1}
      flexDir="column"
      w="100%"
      alignItems={navSize === "small" ? "center" : "flex-start"}
    >
      <Menu placement="right">
        <Link
          as={ReactRouterLink}
          to={path}
          backgroundColor={active ? "#AEC8CA" : "transparent"}
          p={3}
          borderRadius={8}
          _hover={{ textDecor: "none", backgroundColor: "#AEC8CA" }}
          w={navSize === "large" ? "100%" : "auto"}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon
                as={icon}
                fontSize="xl"
                color={active ? "#82AAAD" : "gray.500"}
              />
              <Text ml={5} display={navSize === "small" ? "none" : "flex"}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
};

export default NavItem;
