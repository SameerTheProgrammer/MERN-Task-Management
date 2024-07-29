import { IconButton, useColorMode } from "@chakra-ui/react";
import React from "react";
import { FaRegMoon } from "react-icons/fa6";
import { IoSunnyOutline } from "react-icons/io5";

function DarkModeIconButton({
  ...rest
}: React.ComponentPropsWithoutRef<typeof IconButton>) {
  const { colorMode, toggleColorMode } = useColorMode();

  const isDark = colorMode === "dark";

  return (
    <IconButton
      onClick={toggleColorMode}
      icon={isDark ? <FaRegMoon /> : <IoSunnyOutline />}
      aria-label={"dark-mode-toggle"}
      {...rest}
    />
  );
}

export default DarkModeIconButton;
