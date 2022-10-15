export interface Board {
  id: string;
  name: string;
  columns: Column[];
}

export interface Column {
  id: string;
  name: string;
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
  subtasks: SubTask[];
}

export interface SubTask {
  id: string;
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
  title: string;
  status: string;
  description?: string;
}

export interface ISubTask {
  id: number;
  taskId: number;
  title: string;
  isCompleted: boolean;
}
