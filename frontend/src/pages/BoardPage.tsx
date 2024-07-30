// BoardPage.tsx
import { Flex, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import Filters from "../components/boardPage/Filters";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "../components/boardPage/Column";
import { ColumnType, HeadingType } from "../utils/enums";
import TodoModel from "../components/boardPage/TodoModel";
import { useEffect, useState } from "react";
import { InitialValues } from "../utils/types";
import { useGetAllByStatusQuery } from "../store/tasksApi";
import { setAllTasks } from "../store/tasksSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const BoardPage = () => {
  const dispatch = useAppDispatch();
  const [headingType, setHeadingType] = useState<HeadingType>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [initialValues, setInitialValues] = useState<InitialValues>({
    title: "",
    status: "",
    priority: "",
    deadline: "",
    description: "",
  });

  const user = useAppSelector((state) => state.user);
  const { data, error, isLoading } = useGetAllByStatusQuery(user.id);

  useEffect(() => {
    if (data) {
      dispatch(setAllTasks(data));
    }
  }, [data, dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching tasks</p>;

  return (
    <>
      <Flex direction={"column"} gap={"15px"}>
        <Flex>
          <Filters onOpen={onOpen} />
        </Flex>
        <Flex borderRadius={5} p={5} bgColor={"white"} w={"100%"} h={"80vh"}>
          <DndProvider backend={HTML5Backend}>
            <SimpleGrid w={"100%"} columns={{ md: 3 }}>
              <Column
                setInitialValues={setInitialValues}
                onOpen={onOpen}
                setHeadingType={setHeadingType}
                column={ColumnType.PROGRESS}
              />
              <Column
                setInitialValues={setInitialValues}
                onOpen={onOpen}
                setHeadingType={setHeadingType}
                column={ColumnType.UNDER_REVIREW}
              />
              <Column
                setInitialValues={setInitialValues}
                onOpen={onOpen}
                setHeadingType={setHeadingType}
                column={ColumnType.COMPLETED}
              />
            </SimpleGrid>
          </DndProvider>
        </Flex>
      </Flex>
      <TodoModel
        setInitialValues={setInitialValues}
        initialValues={initialValues}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        heading={headingType!}
      />
    </>
  );
};

export default BoardPage;
