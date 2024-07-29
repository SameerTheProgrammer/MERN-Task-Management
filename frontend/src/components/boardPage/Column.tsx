import { Box, Button, Container, Stack, Text } from "@chakra-ui/react";
import Task from "./Task";
import { ColumnType } from "../../utils/enums";
import useColumnTasks from "../../hooks/useColumnTasks";
import useColumnDrop from "../../hooks/useColumnDrop";
import { IoAddCircleSharp } from "react-icons/io5";
import { useEffect } from "react";

function Column({ column }: { column: ColumnType }) {
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
            />
          ))
        ) : (
          <div>No task</div>
        )}
      </Stack>
    </Box>
  );
}

export default Column;
