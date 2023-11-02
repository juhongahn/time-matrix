import { createContext, useContext, useMemo } from "react";

import { Task } from "@/types";
import useTasksMutation, {
  deleteTaskFetcher,
  updateTaskFetcher,
} from "@/hooks/useTasksMutation";

interface Props {
  children: React.ReactNode;
}

interface TaskItemActions {
  deleteTask: (task: Task) => void;
  toggleDoneTask: (task: Task) => void;
  setDeadLine: (task: Task, date: Date) => void;
  setAssignedPerson: (task: Task, name: string) => void;
}

const TaskItemActionsContext = createContext<TaskItemActions | null>(null);

export const TaskItemActionsProvider = ({ children }: Props) => {
  const updateMutation = useTasksMutation(updateTaskFetcher);
  const deleteMutation = useTasksMutation(deleteTaskFetcher);
  const taskItemActions = useMemo(
    () => ({
      deleteTask(task: Task) {
        onDeleteTask(task);
      },
      toggleDoneTask(task: Task) {
        onToggleTask(task);
      },
      setDeadLine(task: Task, date: Date) {
        onSetDeadLine(task, date);
      },
      setAssignedPerson(task: Task, name: string) {
        onSetAssignedPerson(task, name);
      },
    }),
    []
  );

  return (
    <TaskItemActionsContext.Provider value={taskItemActions}>
      {children}
    </TaskItemActionsContext.Provider>
  );

  function onSetAssignedPerson(task: Task, assignedPersonName: string) {
    const assignedTask = { ...task, assignedPerson: assignedPersonName };
    updateMutation.mutate(assignedTask);
  }

  function onToggleTask(task: Task) {
    const curDate = new Date();
    const updatedTask = {
      ...task,
      quadrantId: "done-board",
      done: !task.done,
      doneAt: !task.done ? curDate.toISOString() : "",
    };
    updateMutation.mutate(updatedTask);
  }

  function onSetDeadLine(task: Task, date: Date) {
    const deadLineUpdatedTask = { ...task, deadLine: date.toISOString() };
    updateMutation.mutate(deadLineUpdatedTask);
  }

  function onDeleteTask(task: Task) {
    deleteMutation.mutate(task);
  }
};

export const useTaskItemActions = () => {
  const context = useContext(TaskItemActionsContext);
  if (!context)
    throw new Error("TaskItemActionsContext가 아직 초기화 되지 않았습니다");
  return context;
};
