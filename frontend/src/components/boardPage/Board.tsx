import { IconButton, Text, Container } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";

const Board = () => {
  return (
    <>
      <Container m={0}>
        <Text>To do</Text>
        <IconButton
          variant="ghost"
          colorScheme="gray"
          aria-label="See menu"
          icon={<BsThreeDotsVertical />}
        />
      </Container>
    </>
  );
};

export default Board;
