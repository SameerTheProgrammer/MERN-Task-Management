import { Flex } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import HCard from "./../components/homePage/Card";
import { cardData } from "./../data/cardData";

const HomePage = () => {
  const time = new Date().getHours();
  return (
    <>
      <Flex direction={"column"} gap={"10px"}>
        <Heading as="h4" size={"md"} noOfLines={1}>
          {time > 0 && time < 12 ? "Good Morning, " : "Good Evening, "}
          Admin 😃
        </Heading>
        <Flex columnGap={1} mt={"10px"} justifyContent={"space-between"}>
          {cardData.map((details, index) => (
            <HCard
              key={index}
              imagePath={details.imagePath}
              title={details.title}
              description={details.description}
            />
          ))}
        </Flex>
      </Flex>
    </>
  );
};

export default HomePage;
