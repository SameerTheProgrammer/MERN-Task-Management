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
import { TaskModel } from "../../utils/models";
import { useTaskDragAndDrop } from "../../hooks/useTaskDragAndDrop";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";

type TaskProps = {
  index: number;
  task: TaskModel;
  onDropHover: (i: number, j: number) => void;
};

function Task({ index, task, onDropHover: handleDropHover }: TaskProps) {
  const { ref, isDragging } = useTaskDragAndDrop<HTMLDivElement>(
    { task, index: index },
    handleDropHover
  );

  return (
    <ScaleFade in={true} unmountOnExit>
      <Box
        ref={ref}
        as="div"
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
        // bgColor={task.color}
        bgColor={"gray.50"}
        borderWidth="2px"
        borderColor={"gray.200"}
        opacity={isDragging ? 0.5 : 1}
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
          top={5}
          right={0}
          zIndex={100}
          aria-label="delete-task"
          size="lg"
          colorScheme="solid"
          color={"gray.700"}
          icon={<GoPencil />}
          opacity={0}
          _groupHover={{
            opacity: 1,
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
            <Flex
              alignItems={"center"}
              columnGap={"10px"}
              color={"gray.500"}
              fontWeight={"bold"}
            >
              <Icon boxSize={4} as={FaRegClock} />
              <Text fontSize={"13px"}>{task.deadline.toLocaleString()}</Text>
            </Flex>
          </Flex>
          <Text color={"gray.500"} fontWeight={"bold"} fontSize={"sm"}>
            1 hr ago
          </Text>
        </Flex>
      </Box>
    </ScaleFade>
  );
}
// export default memo(Task, (prev, next) => {
//   if (
//     _.isEqual(prev.task, next.task) &&
//     _.isEqual(prev.index, next.index) &&
//     prev.onDelete === next.onDelete &&
//     prev.onDropHover === next.onDropHover &&
//     prev.onUpdate === next.onUpdate
//   ) {
//     return true;
//   }

//   return false;
// });

export default Task;
