import { createContext, useContext, useState } from "react";
import useTasksMutation, { dragEndFetcher } from "@/hooks/useTasksMutation";
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
import { useTasks } from "@/contexts/TasksContext";

import { Task } from "@/types";

interface Props {
  children: React.ReactNode;
}

type TaskDndState = Task | null;

const TaskDndContext = createContext<TaskDndState>(null);

export const TaskDndProvider = ({ children }: Props) => {
  const { tasks, tasksReplacementHandler: tasksReplacteHandler } = useTasks();
  const [activeTask, setActiveTask] = useState<TaskDndState>(null);

  const dragOverMutation = useTasksMutation(dragEndFetcher);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  return (
    <TaskDndContext.Provider value={activeTask}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {children}
      </DndContext>
    </TaskDndContext.Provider>
  );

  function handleDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Task") {
      const draggingTask = event.active.data.current.task as Task;
      setActiveTask(draggingTask);
      return;
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveTask(null);
    let tasksCopy = [...tasks];
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id as string;

    if (activeId === overId) return;

    if (
      overId === "done-board" ||
      (over.data.current?.type === "Task" &&
        tasksCopy.find((task) => task.id === overId)?.quadrantId ===
          "done-board")
    ) {
      const curDate = new Date();
      const activeIndex = tasksCopy.findIndex((t) => t.id === activeId);
      tasksCopy[activeIndex].done = true;
      tasksCopy[activeIndex].doneAt = curDate.toISOString();
    }
    dragOverMutation.mutate(tasks);
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

    // Task Item 위로 드래그오버 될 때
    if (isActiveATask && isOverATask) {
      let tasksCopy = [...tasks];
      const activeIndex = tasksCopy.findIndex((t) => t.id === activeId);
      const overIndex = tasksCopy.findIndex((t) => t.id === overId);

      if (
        tasksCopy[activeIndex].quadrantId === "done-board" &&
        tasksCopy[overIndex].quadrantId !== "done-board"
      ) {
        tasksCopy[activeIndex].done = false;
        tasksCopy[activeIndex].doneAt = "";
      }

      if (
        tasksCopy[activeIndex].quadrantId != tasksCopy[overIndex].quadrantId
      ) {
        tasksCopy[activeIndex].quadrantId = tasksCopy[overIndex].quadrantId;
        tasksReplacteHandler(arrayMove(tasksCopy, activeIndex, overIndex - 1));
      }
      tasksReplacteHandler(arrayMove(tasksCopy, activeIndex, overIndex));
    }

    // Quadrant 위로 드래그오버 될 때
    const isOverAQuadrant = over.data.current?.type === "Quadrant";
    if (isActiveATask && isOverAQuadrant) {
      let tasksCopy = [...tasks];
      const activeIndex = tasksCopy.findIndex((t) => t.id === activeId);

      if (
        tasksCopy[activeIndex].quadrantId === "done-board" &&
        overId !== "done-board"
      ) {
        tasksCopy[activeIndex].done = false;
        tasksCopy[activeIndex].doneAt = "";
        tasksCopy[activeIndex].deadLine = "";
      }
      tasksCopy[activeIndex].quadrantId = overId as string;
      tasksReplacteHandler(arrayMove(tasksCopy, activeIndex, activeIndex));
    }
  }
};

export const useTaskDndState = () => {
  const context = useContext(TaskDndContext);
  return context;
};
