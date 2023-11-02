import { useMemo } from "react";
import { SortableContext } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import styled from "styled-components";

import TaskItem from "@/components/task/TaskItem";
import Header from "@/components/ui/Header";
import { Task } from "@/types";
import TaskItemWithoutFn from "./TaskItemWithoutFn";

interface Props {
  tasks: Task[];
  disableDnd: boolean;
}

const Container = styled.div`
  min-width: 350px;
  overflow: hidden;

  position: relative;
  border: 1px solid rgb(216, 222, 228);
  background-color: rgb(246, 248, 250);
  border-radius: 10px;

  display: flex;
  flex-direction: column;

  & .task-board-header {
    padding: 1rem;
    padding-bottom: 0;
  }
`;

const Body = styled.div`
  padding: 1rem;
  padding-top: 0;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 0px;
`;

const DoneBoard = ({ tasks, disableDnd }: Props) => {
  const taskIdList = useMemo(() => tasks.map((task) => task.id), [tasks]);
  const { setNodeRef } = useDroppable({
    id: "done-board",
    data: {
      type: "Quadrant",
      accecpts: ["Task"],
    },
    disabled: disableDnd,
  });

  return (
    <Container>
      <Header
        className="task-board-header"
        title="Done"
        subtitle="Completed task"
        counter={tasks.length}
        type="done-board"
      />
      <Body ref={setNodeRef}>
        <SortableContext items={taskIdList}>
          {tasks
            .filter((task) => task.quadrantId === "done-board")
            .map((task) =>
              disableDnd ? (
                <TaskItemWithoutFn key={task.id} task={task} />
              ) : (
                <TaskItem key={task.id} task={task} />
              )
            )}
        </SortableContext>
      </Body>
    </Container>
  );
};

export default DoneBoard;
