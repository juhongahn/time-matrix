import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useState,
} from "react";
import {
  State,
  TASK_ACTION,
  TaskDispatch,
  taskReducer,
} from "./reducers/taskReducer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import { Task } from "@/types";

interface Props {
  children: React.ReactNode;
}

type TaskCreateIntputValue = {
  visible: boolean;
  value: string;
};

type TaskCreateIntputAction = {
  open: (value: string) => void;
  close: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onEditMode: (task: Task) => void;
  deleteTask: (task: Task) => void;
  toggleDoneTask: (task: Task) => void;
  setDeadLine: (task: Task, date: Date) => void;
  setAssignedPerson: (task: Task, name: string) => void;
};

type TaskEditState = {
  task: Task | null;
  isEdit: boolean;
};

export const initialState: State = {
  tasks: [
    {
      id: 1,
      quadrantId: "task-board",
      task: "유튜브 보기",
      done: false,
      createdAt: new Date(),
      deadLine: null,
      assignedPerson: null,
    },
    {
      id: 2,
      quadrantId: "task-board",
      task: "자기",
      done: false,
      createdAt: new Date(),
      deadLine: null,
      assignedPerson: null,
    },
    {
      id: 3,
      quadrantId: "task-board",
      task: "알바",
      done: false,
      createdAt: new Date(),
      deadLine: null,
      assignedPerson: null,
    },
    {
      id: 4,
      quadrantId: "task-board",
      task: "밥먹기",
      done: false,
      createdAt: new Date(),
      deadLine: null,
      assignedPerson: null,
    },
    {
      id: 5,
      quadrantId: "task-board",
      task: "밥먹기2",
      done: false,
      createdAt: new Date(),
      deadLine: null,
      assignedPerson: null,
    },
  ],
  activeTask: null,
};

const TaskStateContext = createContext<State>(initialState);
const TaskDispatchContext = createContext<TaskDispatch>(() => {});
const TaskCreateInputValueContext = createContext<TaskCreateIntputValue>({
  visible: false,
  value: "",
});
const TaskCreateInputActionsContext = createContext<TaskCreateIntputAction>({
  open: () => {},
  close: () => {},
  onChange: (e) => {},
  onSubmit: (e) => {},
  onEditMode: (e) => {},
  deleteTask: (e) => {},
  toggleDoneTask: (e) => {},
  setDeadLine: (e) => {},
  setAssignedPerson: (e) => {},
});

export const TaskProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [taskCreateInput, setTaskCreateInput] = useState<TaskCreateIntputValue>(
    {
      visible: false,
      value: "",
    }
  );
  const [editState, setEditState] = useState<TaskEditState>({
    task: null,
    isEdit: false,
  });

  const actions = useMemo(
    () => ({
      open(value: string) {
        setTaskCreateInput({
          value,
          visible: true,
        });
      },
      close() {
        setTaskCreateInput((prev) => ({
          ...prev,
          value: "",
          visible: false,
        }));
      },
      onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTaskCreateInput((prev) => ({ ...prev, value: e.target.value }));
      },
      onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (editState.isEdit) {
          const editedTask = {
            ...editState.task,
            task: taskCreateInput.value,
          } as Task;
          dispatch({
            type: TASK_ACTION.EDIT_TASK,
            payload: editedTask,
          });
          setEditState({ task: null, isEdit: false });
        }
        if (!editState.isEdit) {
          dispatch({
            type: TASK_ACTION.ADD_TASK,
            payload: {
              id: generateId(),
              quadrantId: "task-board",
              done: false,
              task: taskCreateInput.value,
              createdAt: new Date(),
              deadLine: null,
              assignedPerson: null,
            },
          });
        }
        actions.close();
      },
      onEditMode(task: Task) {
        onEditTask(task);
      },
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
    [taskCreateInput.value]
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  return (
    <TaskStateContext.Provider value={state}>
      <TaskDispatchContext.Provider value={dispatch}>
        <TaskCreateInputActionsContext.Provider value={actions}>
          <TaskCreateInputValueContext.Provider value={taskCreateInput}>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
            >
              {children}
            </DndContext>
          </TaskCreateInputValueContext.Provider>
        </TaskCreateInputActionsContext.Provider>
      </TaskDispatchContext.Provider>
    </TaskStateContext.Provider>
  );

  function onSetAssignedPerson(task: Task, assignedPersonName: string) {
    const assignedTask = { ...task, assignedPerson: assignedPersonName };
    dispatch({
      type: TASK_ACTION.SET_ASSIGNED_PERSON,
      payload: assignedTask,
    });
  }

  function onToggleTask(task: Task) {
    dispatch({
      type: TASK_ACTION.TASK_DONE_TOGGLE,
      payload: task,
    });
  }

  function onSetDeadLine(task: Task, date: Date) {
    const deadLineUpdatedTask = { ...task, deadLine: date };
    dispatch({
      type: TASK_ACTION.SET_DEADLINE,
      payload: deadLineUpdatedTask,
    });
  }

  function onEditTask(targetTask: Task) {
    actions.open(targetTask.task);
    setTaskCreateInput((prev) => {
      return { ...prev, value: targetTask.task };
    });
    setEditState({ task: targetTask, isEdit: true });
  }

  function onDeleteTask(task: Task) {
    dispatch({ type: TASK_ACTION.REMOVE_TASK, payload: task });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id as string;

    const isActiveAQuadrant = active.data.current?.type === "Quadrant";
    if (!isActiveAQuadrant) return;

    if (activeId === overId) return;

    const targetTask = state.tasks.find((task) => task.id === activeId);

    if (!targetTask) return;

    dispatch({
      type: TASK_ACTION.DRAG_TASK,
      payload: { ...targetTask, quadrantId: overId },
    });
  }

  function handleDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Task") {
      const draggingTask = event.active.data.current.task as Task;
      dispatch({
        type: TASK_ACTION.DRAG_TASK_START,
        payload: draggingTask,
      });
      return;
    }
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    if (isActiveATask && isOverATask) {
      const tasks = state.tasks;
      const activeIndex = tasks.findIndex((t) => t.id === activeId);
      const overIndex = tasks.findIndex((t) => t.id === overId);
      if (tasks[activeIndex].quadrantId != tasks[overIndex].quadrantId) {
        tasks[activeIndex].quadrantId = tasks[overIndex].quadrantId;
        dispatch({
          type: TASK_ACTION.DRAG_TASK_OVER,
          payload: arrayMove(tasks, activeIndex, overIndex - 1),
        });
      }
      dispatch({
        type: TASK_ACTION.DRAG_TASK_OVER,
        payload: arrayMove(tasks, activeIndex, overIndex),
      });
    }

    const isOverAQuadrant = over.data.current?.type === "Quadrant";

    if (isActiveATask && isOverAQuadrant) {
      const tasks = state.tasks;
      const activeIndex = tasks.findIndex((t) => t.id === activeId);
      tasks[activeIndex].quadrantId = overId as string;
      dispatch({
        type: TASK_ACTION.DRAG_TASK_OVER,
        payload: arrayMove(tasks, activeIndex, activeIndex),
      });
    }
  }
};

export function useTaskCreateInputValue() {
  return useContext(TaskCreateInputValueContext);
}

export function useTaskCreateInputActions() {
  return useContext(TaskCreateInputActionsContext);
}

export const useTaskState = () => {
  return useContext(TaskStateContext);
};

export const useTaskDispatch = () => {
  return useContext(TaskDispatchContext);
};

const generateId = () => {
  return Math.floor(Math.random() * 10001);
};
