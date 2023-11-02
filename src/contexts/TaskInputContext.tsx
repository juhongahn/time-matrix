import useTasksMutation, { AddTask, addTaskFetcher, updateTaskFetcher } from "@/hooks/useTasksMutation";
import { createContext, useContext, useMemo, useState } from "react";

import { Task } from "@/types";

interface Props {
  children: React.ReactNode;
}

interface TaskIntputState {
  visible: boolean;
  value: string;
}

interface TaskEditState {
  task: Task | null;
  isEditMode: boolean;
}

interface TaskIntputAction {
  openTaskInput(value: string): void;
  closeTaskInput(): void;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  onSubmit(e: React.FormEvent<HTMLFormElement>): void;
  setEditMode(targetTask: Task): void;
}

const taskInputInitialValue = {
  visible: false,
  value: "",
};

const taskEditStateInitialValue = {
  task: null,
  isEditMode: false,
};

const TaskInputStateContext = createContext<TaskIntputState>(
  taskInputInitialValue
);

const TaskInputActionsContext = createContext<TaskIntputAction | null>(null);

export const TaskInputProvider = ({ children }: Props) => {
  const [taskInput, setTaskInput] = useState<TaskIntputState>(
    taskInputInitialValue
  );
  const [editTaskState, setEditTaskState] = useState<TaskEditState>(
    taskEditStateInitialValue
  );

  const updateMutation = useTasksMutation(updateTaskFetcher);
  const addMutation = useTasksMutation(addTaskFetcher);

  const taskInputActions = useMemo<TaskIntputAction>(
    () => ({
      openTaskInput(value: string) {
        setTaskInput({
          value,
          visible: true,
        });
      },
      closeTaskInput() {
        setTaskInput({
          value: "",
          visible: false,
        });
      },
      onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTaskInput((prev) => ({ ...prev, value: e.target.value }));
      },
      onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (editTaskState.isEditMode) {
          const editedTask = {
            ...editTaskState.task,
            task: taskInput.value,
          } as Task;
          updateMutation.mutate(editedTask);
          setEditTaskState({ task: null, isEditMode: false });
        } else if (!editTaskState.isEditMode) {
          const newTask: AddTask = {
            quadrantId: "task-board",
            done: false,
            doneAt: "",
            task: taskInput.value,
            createdAt: new Date().toISOString(),
            deadLine: "",
            assignedPerson: "",
            status: "active",
          };
          addMutation.mutate(newTask);
        }
        taskInputActions.closeTaskInput();
      },
      setEditMode(targetTask: Task) {
        taskInputActions.openTaskInput(targetTask.task);
        setTaskInput((prev) => {
          return { ...prev, value: targetTask.task };
        });
        setEditTaskState({ task: targetTask, isEditMode: true });
      },
    }),
    [taskInput.value]
  );
  return (
    <TaskInputStateContext.Provider value={taskInput}>
      <TaskInputActionsContext.Provider value={taskInputActions}>
        {children}
      </TaskInputActionsContext.Provider>
    </TaskInputStateContext.Provider>
  );
};

export const useTaskInputState = () => {
  const context = useContext(TaskInputStateContext);
  if (!context)
    throw new Error("TaskInputStateContext가 아직 초기화 되지 않았습니다");
  return context;
};

export const useTaskInputActions = () => {
  const context = useContext(TaskInputActionsContext);
  if (!context)
    throw new Error("TaskInputActionsContext 아직 초기화 되지 않았습니다");
  return context;
};
