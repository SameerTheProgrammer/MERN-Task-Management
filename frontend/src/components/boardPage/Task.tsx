import {
  Badge,
  Box,
  Flex,
  Heading,
  Icon,
  IconButton,
  ScaleFade,
  Text,
  useToast,
} from "@chakra-ui/react";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import { HeadingType } from "../../utils/enums";
import { APIError, InitialValues, TaskData } from "../../utils/types";
import moment from "moment";
import { useDrag } from "react-dnd";
import { removeTask } from "../../store/tasksSlice";
import { useDeleteTaskMutation } from "../../store/tasksApi";
import { useAppDispatch } from "../../store/hooks";

type TaskProps = {
  index: number;
  task: TaskData;
  onOpen: () => void;
  setHeadingType: React.Dispatch<React.SetStateAction<HeadingType | undefined>>;
  setInitialValues: React.Dispatch<React.SetStateAction<InitialValues>>;
};

function Task({ task, onOpen, setHeadingType, setInitialValues }: TaskProps) {
  const [deleteTask] = useDeleteTaskMutation();
  const dispatch = useAppDispatch();
  const toast = useToast();

  const handleDelete = async () => {
    try {
      await deleteTask(task.id!).unwrap();
      dispatch(removeTask(task.id!));
    } catch (error) {
      if ((error as APIError).data) {
        const apiError = error as APIError;
        toast({
          title: `Deleting a task failed`,
          description:
            apiError.data.error[0].msg || "An unexpected error occurred.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: "TASK",
    item: { ...task },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });

  const editHandler = () => {
    setInitialValues({
      id: task.id,
      title: task.title,
      status: task.status,
      priority: task.priority,
      deadline: task.deadline,
      description: task.description,
    });
    setHeadingType(HeadingType.EDIT);
    onOpen();
  };

  return (
    <ScaleFade in={true} unmountOnExit>
      <Box
        ref={dragRef}
        role="group"
        position="relative"
        rounded="lg"
        w={"100%"}
        pl={3}
        pr={7}
        pt={3}
        pb={1}
        cursor="grab"
        userSelect="none"
        bgColor={isDragging ? "gray.100" : "gray.50"}
        borderWidth="2px"
        borderColor={"gray.200"}
      >
        <IconButton
          position="absolute"
          top={0}
          right={0}
          zIndex={100}
          aria-label="delete-task"
          size="lg"
          colorScheme="solid"
          color={"gray.700"}
          icon={<MdDeleteOutline />}
          opacity={0}
          _groupHover={{
            opacity: 1,
          }}
          onClick={handleDelete}
        />
        <IconButton
          position="absolute"
          top={7}
          right={0}
          zIndex={100}
          aria-label="edit-task"
          size="lg"
          colorScheme="solid"
          color={"gray.700"}
          icon={<GoPencil />}
          opacity={0}
          _groupHover={{
            opacity: 1,
          }}
          onClick={editHandler}
        />
        <Flex direction={"column"} rowGap={"8px"}>
          <Heading color={"gray.500"} as={"h4"} size={"sm"}>
            {task.title}
          </Heading>
          <div>
            <Text fontSize="sm" color={"gray.500"}>
              {task.description}
            </Text>
          </div>
          <Flex w={"100%"} justifyContent={"space-between"}>
            <Badge
              borderRadius={5}
              color={"gray.600"}
              px={4}
              py={2}
              w={"max-content"}
              bgColor="gray.300"
            >
              {task.priority}
            </Badge>
            {task.deadline ? (
              <Flex
                alignItems={"center"}
                columnGap={"10px"}
                color={"gray.500"}
                fontWeight={"bold"}
              >
                <Icon boxSize={4} as={FaRegClock} />
                <Text fontSize={"13px"}>
                  {task.deadline
                    ? moment(task.deadline).format("YYYY-MM-DD hh:mm:ss A")
                    : ""}
                </Text>
              </Flex>
            ) : (
              " "
            )}
          </Flex>
          <Text color={"gray.500"} fontWeight={"bold"} fontSize={"sm"}>
            1 hr ago
          </Text>
        </Flex>
      </Box>
    </ScaleFade>
  );
}

export default Task;
