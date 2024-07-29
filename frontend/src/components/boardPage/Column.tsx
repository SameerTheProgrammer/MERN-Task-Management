import {
  Box,
  Button,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Task from "./Task";
import { ColumnType } from "../../utils/enums";
import useColumnTasks from "../../hooks/useColumnTasks";
import useColumnDrop from "../../hooks/useColumnDrop";
import { IoAddCircleSharp } from "react-icons/io5";

function Column({ column }: { column: ColumnType }) {
  const { tasks, addEmptyTask, dropTaskFrom, swapTasks } =
    useColumnTasks(column);

  const { dropRef, isOver } = useColumnDrop(column, dropTaskFrom);

  const ColumnTasks = tasks.map((task, index) => (
    <Task key={task.id} task={task} index={index} onDropHover={swapTasks} />
  ));

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
          color={useColorModeValue("gray.500", "gray.400")}
          bgColor={useColorModeValue("gray.100", "gray.700")}
          _hover={{ bgColor: useColorModeValue("gray.200", "gray.600") }}
          px={3}
          onClick={addEmptyTask}
          aria-label="add-task"
        >
          Add
        </Button>
      </Container>

      <Stack
        ref={dropRef}
        direction={{ base: "row", md: "column" }}
        // maxHeight={"95%"}
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
        {ColumnTasks}
      </Stack>
    </Box>
  );
}

export default Column;
