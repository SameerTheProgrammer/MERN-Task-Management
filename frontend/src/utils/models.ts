import { ColumnType, Priority } from "./enums";

export interface TaskModel {
  id: string;
  title: string;
  description: string;
  status: ColumnType;
  priority: Priority;
  deadline: Date;
}

export interface DragItem {
  index: number;
  id: TaskModel["id"];
  from: ColumnType;
}
