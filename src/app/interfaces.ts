export interface Board {
  id: string;
  name: string;
  columns: Column[];
}

export interface Column {
  name: string;
  tasks?: Task[];
}

export interface Task {
  title: string;
  description?: string;
  status: string;
  subtasks: SubTask[];
}

export interface SubTask {
  title: string;
  isCompleted: boolean;
}
