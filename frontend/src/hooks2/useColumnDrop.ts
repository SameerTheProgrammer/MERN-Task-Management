// useColumnDrop.ts
import { useDrop } from "react-dnd";
import { ColumnType } from "../utils/enums";
import { useAppDispatch } from "../store/hooks";
import { moveTask } from "../store/tasksSlice";

const useColumnDrop = (column: ColumnType) => {
  const dispatch = useAppDispatch();

  const [{ isOver }, dropRef] = useDrop({
    accept: "TASK",
    drop: (item: { id: string; from: ColumnType }) => {
      dispatch(moveTask({ from: item.from, to: column, id: item.id }));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return { dropRef, isOver };
};

export default useColumnDrop;
