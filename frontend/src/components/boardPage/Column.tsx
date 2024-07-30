import { Box, Button, Container, Stack, Text } from "@chakra-ui/react";
import Task from "./Task";
import { ColumnType, HeadingType } from "../../utils/enums";
import { IoAddCircleSharp } from "react-icons/io5";
import { InitialValues } from "../../utils/types";
import { useAppSelector } from "../../store/hooks";
import useColumnDrop from "../../hooks/useColumnDrop";

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
  const tasks = useAppSelector((state) => state.tasks[column]);
  const { dropRef, isOver } = useColumnDrop(column);

  return (
    <Box
      px={1}
      h={"100%"}
      ref={dropRef}
      bgColor={isOver ? "blue.100" : "transparent"}
    >
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
        direction={{ base: "row", md: "column" }}
        h={"70vh"}
        p={1}
        mt={2}
        spacing={4}
        rounded="lg"
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
              key={task.id || index}
              task={task}
              index={index}
              onOpen={onOpen}
              setHeadingType={setHeadingType}
              setInitialValues={setInitialValues}
            />
          ))
        ) : (
          <Text>No tasks</Text>
        )}
      </Stack>
    </Box>
  );
};

export default Column;
