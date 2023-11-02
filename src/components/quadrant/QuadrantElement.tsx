import { useDroppable } from "@dnd-kit/core";
import { useMemo } from "react";
import styled from "styled-components";
import { SortableContext } from "@dnd-kit/sortable";

import { Task } from "@/types";
import Header from "@/components/ui/Header";
import TaskItemWrapper from "../task/TaskItemWrapper";

interface Props {
  title: string;
  subtitle: string;
  row: number;
  column: number;
  type: string;
  tasks: Task[];
}

const Container = styled.div<{ $row: number; $column: number }>`
  min-width: 380px;
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: start;

  grid-row: ${(props) => props.$row};
  grid-column: ${(props) => props.$column};
  padding: 1rem;

  border: 1px solid rgb(216, 222, 228);
  background-color: rgb(246, 248, 250);
  border-radius: 10px;
  overflow-y: hidden;
`;

const Body = styled.div`
  width: 100%;
  height: 0px;

  flex-direction: column;
  flex-grow: 1;

  overflow-y: auto;
`;

function QuadrantElement({ title, subtitle, row, column, type, tasks }: Props) {
  const { setNodeRef } = useDroppable({
    id: type,
    data: {
      type: "Quadrant",
      accepts: ["Task"],
    },
  });
  const taskIdList = useMemo(() => tasks.map((task) => task.id), [tasks]);
  return (
    <Container $row={row} $column={column}>
      <Header
        title={title}
        subtitle={subtitle}
        counter={tasks.length}
        type={type}
      />
      <Body ref={setNodeRef}>
        <SortableContext items={taskIdList}>
          {tasks.map((task) => (
            <TaskItemWrapper key={task.id} task={task} />
          ))}
        </SortableContext>
      </Body>
    </Container>
  );
}

export default QuadrantElement;
