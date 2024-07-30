import { useDrag, useDrop } from "react-dnd";
import { TaskData } from "../utils/types";

export const useTaskDragAndDrop = (
  task: TaskData,
  index: number,
  onDropHover: (fromIndex: number, toIndex: number) => void
) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "TASK",
    item: { task, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: "TASK",
    hover: (item: { task: TaskData; index: number }) => {
      if (item.index !== index) {
        onDropHover(item.index, index);
        item.index = index;
      }
    },
  });

  return {
    ref: (node: HTMLDivElement) => {
      dragRef(node);
      dropRef(node);
    },
    isDragging,
  };
};
