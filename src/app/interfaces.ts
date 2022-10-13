export interface Board {
  id: string;
  name: string;
  columns: Column[];
}

export interface Column {
  id: string;
  boardId: string;
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
  taskId: string;
  title: string;
  isCompleted: boolean;
}
