import { Flex, useDisclosure } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import HCard from "./../components/homePage/Card";
import { cardData } from "./../data/cardData";
import Filters from "./../components/homePage/Filters";
import TodoModel from "./../components/homePage/TodoModel";

const HomePage = () => {
  const time = new Date().getHours();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex direction={"column"} gap={"10px"}>
        <Heading as="h3" size={"lg"} noOfLines={1}>
          {time > 0 && time < 12 ? "Good Morning, " : "Good Evening, "}
          Admin 😃
        </Heading>
        <Flex columnGap={1} mt={"10px"} justifyContent={"space-between"}>
          {cardData.map((details) => (
            <HCard
              imagePath={details.imagePath}
              title={details.title}
              description={details.description}
            />
          ))}
        </Flex>
        <Flex>
          <Filters onOpen={onOpen} />
        </Flex>
      </Flex>
      <TodoModel
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        heading="Create Todo"
      />
    </>
  );
};

export default HomePage;
