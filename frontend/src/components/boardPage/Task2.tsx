import {
  Badge,
  Box,
  Flex,
  Heading,
  Icon,
  IconButton,
  ScaleFade,
  Text,
} from "@chakra-ui/react";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import { HeadingType } from "../../utils/enums";
import { InitialValues, TaskData } from "../../utils/types";
import moment from "moment";
import { useDrag } from "react-dnd";

type TaskProps = {
  index: number;
  task: TaskData;
  onOpen: () => void;
  setHeadingType: React.Dispatch<React.SetStateAction<HeadingType | undefined>>;
  setInitialValues: React.Dispatch<React.SetStateAction<InitialValues>>;
};

function Task({ task, onOpen, setHeadingType, setInitialValues }: TaskProps) {
  const [{ isDragging }, dragRef] = useDrag({
    type: "TASK",
    item: { id: task.id, from: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

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
          onClick={() => {
            setInitialValues({
              title: task.title,
              status: task.status,
              priority: task.priority,
              deadline: task.deadline,
              description: task.description,
            });
            setHeadingType(HeadingType.EDIT);
            onOpen();
          }}
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
