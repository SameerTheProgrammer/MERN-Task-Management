import { useLocalStorage } from "usehooks-ts";
import { v4 as uuidv4 } from "uuid";
import { ColumnType, Priority } from "../utils/enums";
import { TaskModel } from "../utils/models";

function useTaskCollection() {
  return useLocalStorage<{
    [key in ColumnType]: TaskModel[];
  }>("tasks", {
    "In Progress": [
      {
        id: uuidv4(),
        title: "Task 2",
        status: ColumnType.IN_PROGRESS,
        description: "Task 2",
        priority: Priority.HIGH,
        deadline: new Date(),
      },
    ],
    "Under Review": [
      {
        id: uuidv4(),
        title: "Task 2",
        status: ColumnType.UNDER_REVIREW,
        description: "Task 2",
        priority: Priority.LOW,
        deadline: new Date(),
      },
    ],
    Completed: [
      {
        id: uuidv4(),
        title: "Task 2",
        status: ColumnType.COMPLETED,
        description: "Task 2",
        priority: Priority.NORMAL,
        deadline: new Date(),
      },
    ],
  });
}

export default useTaskCollection;
