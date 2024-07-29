import { Flex, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import Filters from "../components/boardPage/Filters";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "../components/boardPage/Column";
// import DarkModeIconButton from "../components/homePage/board/DarkModeIconButton";
import { ColumnType } from "../utils/enums";
import TodoModel from "../components/boardPage/TodoModel";

const BoardPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex direction={"column"} gap={"15px"}>
        <Flex>
          <Filters onOpen={onOpen} />
        </Flex>
        <Flex borderRadius={5} p={5} bgColor={"white"} w={"100%"} h={"80vh"}>
          {/* <DarkModeIconButton position="absolute" top={0} right={2} /> */}
          <DndProvider backend={HTML5Backend}>
            <SimpleGrid w={"100%"} columns={{ md: 3 }}>
              <Column column={ColumnType.IN_PROGRESS} />
              <Column column={ColumnType.UNDER_REVIREW} />
              <Column column={ColumnType.COMPLETED} />
            </SimpleGrid>
          </DndProvider>
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

export default BoardPage;
