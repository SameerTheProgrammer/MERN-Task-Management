import { useDrop } from "react-dnd";
import { ColumnType } from "../utils/enums";
import { useAppDispatch } from "../store/hooks";
import { moveTask, revertMoveTask } from "../store/tasksSlice";
import { useUpdateTaskMutation } from "../store/tasksApi";
import { TaskData } from "../utils/types";

const useColumnDrop = (column: ColumnType) => {
  const dispatch = useAppDispatch();
  const [updateTask] = useUpdateTaskMutation();

  const [{ isOver }, dropRef] = useDrop({
    accept: "TASK",
    drop: async (item: TaskData) => {
      if (item.status !== column) {
        console.log({ from: item.status, to: column, id: item.id! });
        dispatch(moveTask({ from: item.status, to: column, id: item.id! }));

        try {
          await updateTask({
            id: item.id,
            task: {
              status: column,
              title: item.title,
              description: item.description,
              priority: item.priority,
              deadline: item.deadline,
            },
          }).unwrap();
        } catch (error) {
          console.error("Failed to update and Drop task:", error);
          dispatch(
            revertMoveTask({ from: column, to: item.status, id: item.id! })
          );
        }
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return { dropRef, isOver };
};

export default useColumnDrop;
