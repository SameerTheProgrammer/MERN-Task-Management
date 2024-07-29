import { Box, Button, Container, Stack, Text } from "@chakra-ui/react";
import Task from "./Task";
import { ColumnType, HeadingType } from "../../utils/enums";
import useColumnTasks from "../../hooks/useColumnTasks";
import useColumnDrop from "../../hooks/useColumnDrop";
import { IoAddCircleSharp } from "react-icons/io5";
import { useEffect } from "react";
import { InitialValues } from "../../utils/types";

interface ColumnProps {
  onOpen: () => void;
  column: ColumnType;
  setHeadingType: React.Dispatch<React.SetStateAction<HeadingType | undefined>>;
  setInitialValues: React.Dispatch<React.SetStateAction<InitialValues>>;
}

const Column: React.FC<ColumnProps> = ({
  column,
  setHeadingType,
  onOpen,
  setInitialValues,
}) => {
  const { tasks, dropTaskFrom, swapTasks } = useColumnTasks(column);
  useEffect(() => {
    console.log(`Tasks for column ${column}:`, tasks);
  }, [tasks, column]);

  const { dropRef, isOver } = useColumnDrop(column, dropTaskFrom);
  return (
    <Box px={1} h={"100%"}>
      <Container
        w={"100%"}
        m={0}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <div>
          <Text color={"gray"} fontWeight={"bold"} fontSize={"medium"}>
            {column}
          </Text>
        </div>
        <Button
          size={"sm"}
          rightIcon={<IoAddCircleSharp size={20} />}
          colorScheme="teal"
          variant="solid"
          w={"fit-content"}
          color={"gray.500"}
          bgColor={"gray.100"}
          _hover={{ bgColor: "gray.400" }}
          px={3}
          aria-label="add-task"
          onClick={() => {
            setHeadingType(HeadingType.ADD);
            setInitialValues((prev) => ({
              ...prev,
              status: column,
            }));
            onOpen();
          }}
        >
          Add
        </Button>
      </Container>

      <Stack
        ref={dropRef}
        direction={{ base: "row", md: "column" }}
        h={"70vh"}
        p={1}
        mt={2}
        spacing={4}
        rounded="lg"
        opacity={isOver ? 0.85 : 1}
        overflowY={"scroll"}
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {tasks ? (
          tasks.map((task, index) => (
            <Task
              key={task.id}
              task={task}
              index={index}
              onDropHover={swapTasks}
              onOpen={onOpen}
              setHeadingType={setHeadingType}
              setInitialValues={setInitialValues}
            />
          ))
        ) : (
          <div>No task</div>
        )}
      </Stack>
    </Box>
  );
};

export default Column;
