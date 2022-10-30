export interface Board {
  id: number;
  name: string;
  columns: Column[];
}

export interface Column {
  id: number;
  boardId: number;
  name: string;
  tasks: Task[];
}

export interface Task {
  id: number;
  columnId: number;
  title: string;
  description?: string;
  subtasks: SubTask[];
}

export interface SubTask {
  id: number;
  taskId: number;
  title: string;
  isCompleted: boolean;
}

export interface IBoard {
  id: number;
  name: string;
}

export interface IColumn {
  id: number;
  boardId: number;
  name: string;
}

export interface ITask {
  id: number;
  columnId: number;
  position: number;
  title: string;
  description?: string;
}

export interface ISubTask {
  id: number;
  taskId: number;
  title: string;
  isCompleted: boolean;
}
