import useTasksQuery from "@/hooks/useTasksQuery";
import { createContext, useEffect, useState, useContext } from "react";

import { Task } from "@/types";

interface Props {
  children: React.ReactNode;
}

interface TaskListState {
  tasks: Task[];
  tasksReplacementHandler: (task: Task[]) => void;
}

const TasksContext = createContext<TaskListState | null>(null);

export const TasksProvider = ({ children }: Props) => {
  const { isLoading, data = [] } = useTasksQuery();
  const [tasks, setTasks] = useState<Task[]>(data);

  useEffect(() => {
    if (!isLoading) setTasks(data);
  }, [data]);

  const dragOverTaskListHandler = (draggedOvertasks: Task[]) => {
    setTasks(draggedOvertasks);
  };

  return (
    <TasksContext.Provider
      value={{ tasks, tasksReplacementHandler: dragOverTaskListHandler }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) throw new Error("TasksContext가 아직 초기화 되지 않았습니다");
  return context;
};
