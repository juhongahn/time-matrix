import { Dispatch } from "react";

import { Task } from "@/types";

export enum TASK_ACTION {
  ADD_TASK = "ADD_TASK",
  TASK_DONE_TOGGLE = "TASK_DONE_TOGGLE",
  DRAG_TASK = "DRAG_TASK",
  DRAG_TASK_START = "DRAG_TASK_START",
  DRAG_TASK_OVER = "DRAG_TASK_OVER",
  REMOVE_TASK = "REMOVE_TASK",
  EDIT_TASK = "EDIT_TASK",
  SET_DEADLINE = "SET_DEADLINE",
  SET_ASSIGNED_PERSON = "SET_ASSIGNED_PERSON",
}

export type State = {
  tasks: Task[];
  activeTask: Task | null;
};

export type TaskDispatch = Dispatch<{
  type: string;
  payload: Task;
}>;

type DeadLineValue = {
  task: Task;
  date: Date;
};

export const taskReducer = (
  state: State,
  action: { type: string; payload: Task | Task[] | DeadLineValue }
): State => {
  switch (action.type) {
    case TASK_ACTION.ADD_TASK:
      return addTask(state, action.payload as Task);
    case TASK_ACTION.TASK_DONE_TOGGLE:
      return toggleTaskDone(state, action.payload as Task);
    case TASK_ACTION.DRAG_TASK:
      return dragTaskEnd(state, action.payload as Task);
    case TASK_ACTION.DRAG_TASK_START:
      return dragTaskStart(state, action.payload as Task);
    case TASK_ACTION.DRAG_TASK_OVER:
      return dragTaskOver(state, action.payload as Task[]);
    case TASK_ACTION.REMOVE_TASK:
      return removeTask(state, action.payload as Task);
    case TASK_ACTION.EDIT_TASK:
      return editTask(state, action.payload as Task);
    case TASK_ACTION.SET_DEADLINE:
      return setDeadLine(state, action.payload as Task);
    case TASK_ACTION.SET_ASSIGNED_PERSON:
      return setAssignedPerson(state, action.payload as Task);
    default:
      return state;
  }
};

const setAssignedPerson = (state: State, updatedTask: Task) => {
  return {
    ...state,
    tasks: state.tasks.map((task) => {
      if (task.id === updatedTask.id) {
        return { ...task, assignedPerson: updatedTask.assignedPerson };
      } else {
        return task;
      }
    }),
  };
};

const addTask = (state: State, addedTask: Task) => {
  return {
    ...state,
    tasks: [...state.tasks, addedTask],
  };
};

const toggleTaskDone = (state: State, targetTask: Task) => {
  return {
    ...state,
    tasks: state.tasks.map((task) =>
      task.id === targetTask.id ? { ...task, done: !task.done } : task
    ),
  };
};

const setDeadLine = (state: State, updatedTask: Task) => {
  return {
    ...state,
    tasks: state.tasks.map((task) => {
      if (task.id === updatedTask.id) {
        return { ...task, deadLine: updatedTask.deadLine };
      } else {
        return task;
      }
    }),
  };
};

const dragTaskEnd = (state: State, targetTask: Task) => {
  return {
    ...state,
    tasks: state.tasks.map((task) =>
      task.id === targetTask.id
        ? { ...task, quadrantId: targetTask.quadrantId }
        : task
    ),
  };
};

const dragTaskStart = (state: State, targetTask: Task) => {
  return {
    ...state,
    activeTask: targetTask,
  };
};

const dragTaskOver = (state: State, targetTask: Task[]) => {
  return {
    ...state,
    tasks: targetTask,
  };
};

const editTask = (state: State, editedTask: Task) => {
  return {
    ...state,
    tasks: state.tasks.map((task) => {
      if (task.id === editedTask.id) {
        return editedTask;
      } else {
        return task;
      }
    }),
  };
};

const removeTask = (state: State, targetTask: Task) => {
  return {
    ...state,
    tasks: state.tasks.filter((task) => task.id !== targetTask.id),
  };
};
