import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { ColumnType } from "../utils/enums";
import { debug } from "../utils/logging";
import { TaskModel } from "../utils/models";
import useTaskCollection from "./useTaskCollection";
import { swap } from "../utils/helpers";

const MAX_TASK_PER_COLUMN = 100;

function useColumnTasks(status: ColumnType) {
  const [tasks, setTasks] = useTaskCollection();

  const columnTasks = tasks[status];

  const addEmptyTask = useCallback(() => {
    debug(`Adding new empty task to ${status} column`);
    setTasks((allTasks) => {
      const columnTasks = allTasks[status];

      if (columnTasks.length > MAX_TASK_PER_COLUMN) {
        debug("Too many task!");
        return allTasks;
      }

      const newColumnTask: TaskModel = {
        id: uuidv4(),
        title: `New ${status} task`,
        // // color: pickChakraRandomColor(".300"),
        status,
      };

      return {
        ...allTasks,
        [status]: [newColumnTask, ...columnTasks],
      };
    });
  }, [status, setTasks]);

  const deleteTask = useCallback(
    (id: TaskModel["id"]) => {
      debug(`Removing task ${id}..`);
      setTasks((allTasks) => {
        const columnTasks = allTasks[status];
        return {
          ...allTasks,
          [status]: columnTasks.filter((task) => task.id !== id),
        };
      });
    },
    [status, setTasks]
  );

  const updateTask = useCallback(
    (id: TaskModel["id"], updatedTask: Omit<Partial<TaskModel>, "id">) => {
      debug(`Updating task ${id} with ${JSON.stringify(updateTask)}`);
      setTasks((allTasks) => {
        const columnTasks = allTasks[status];
        return {
          ...allTasks,
          [status]: columnTasks.map((task) =>
            task.id === id ? { ...task, ...updatedTask } : task
          ),
        };
      });
    },
    [status, setTasks]
  );

  const dropTaskFrom = useCallback(
    (from: ColumnType, id: TaskModel["id"]) => {
      setTasks((allTasks) => {
        const fromColumnTasks = allTasks[from];
        const toColumnTasks = allTasks[status];
        const movingTask = fromColumnTasks.find((task) => task.id === id);

        console.log(`Moving task ${movingTask?.id} from ${from} to ${status}`);

        if (!movingTask) {
          return allTasks;
        }

        // remove the task from the original column and copy it within the destination column
        return {
          ...allTasks,
          [from]: fromColumnTasks.filter((task) => task.id !== id),
          [status]: [{ ...movingTask, status }, ...toColumnTasks],
        };
      });
    },
    [status, setTasks]
  );

  const swapTasks = useCallback(
    (i: number, j: number) => {
      debug(`Swapping task ${i} with ${j} in ${status} column`);
      setTasks((allTasks) => {
        const columnTasks = allTasks[status];
        return {
          ...allTasks,
          [status]: swap(columnTasks, i, j),
        };
      });
    },
    [status, setTasks]
  );

  return {
    tasks: columnTasks,
    addEmptyTask,
    updateTask,
    dropTaskFrom,
    deleteTask,
    swapTasks,
  };
}

export default useColumnTasks;