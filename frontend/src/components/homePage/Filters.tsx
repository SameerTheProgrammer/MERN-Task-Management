import {
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import { CiCalendar, CiFilter } from "react-icons/ci";
import { IoAddCircleSharp } from "react-icons/io5";
import { MdOutlineAutoAwesome, MdOutlineShare } from "react-icons/md";

const Filters = () => {
  return (
    <>
      <Flex justifyContent={"space-between"} w={"100%"}>
        <InputGroup w={"250px"}>
          <Input bgColor={"white"} placeholder="Search" color={"gray"} />
          <InputRightElement>
            <BiSearch color="gray" size={25} />
          </InputRightElement>
        </InputGroup>
        <Flex color={"gray"}>
          <Button colorScheme="teal" variant="ghost">
            Calender view
            <Icon as={CiCalendar} ml={2} fontSize={20} />
          </Button>
          <Button colorScheme="teal" variant="ghost">
            Automation
            <Icon as={MdOutlineAutoAwesome} ml={2} fontSize={20} />
          </Button>
          <Button colorScheme="teal" variant="ghost">
            Filter
            <Icon as={CiFilter} ml={2} fontSize={20} />
          </Button>
          <Button colorScheme="teal" variant="ghost">
            Share
            <Icon as={MdOutlineShare} ml={2} fontSize={20} />
          </Button>
          <Button
            rightIcon={<IoAddCircleSharp size={25} color="white" />}
            colorScheme="teal"
            variant="solid"
          >
            Create new
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default Filters;
