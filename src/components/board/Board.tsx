import { DragOverlay } from "@dnd-kit/core";
import { useTaskDndState } from "@/contexts/TaskDndContext";
import { useTasks } from "@/contexts/TasksContext";
import styled from "styled-components";

import TaskBoard from "@/components/task/TaskBoard";
import FirstQuadrant from "@/components/quadrant/FirstQuadrant";
import SecondQuadrant from "@/components/quadrant/SecondQuadrant";
import ThirdQuadrant from "@/components/quadrant/ThirdQuadrant";
import FourthQuadrant from "@/components/quadrant/FourthQuadrant";
import TaskItem from "@/components/task/TaskItem";
import DoneBoard from "@/components/task/DoneBoard";

const Container = styled.div`
  height: 100%;
  padding: 0.5rem;

  display: flex;
  gap: 0.5rem;
`;

const Quadrant = styled.div`
  width: 100%;

  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`;

const Board = () => {
  const activeTask = useTaskDndState();
  const { tasks } = useTasks();

  return (
    <Container>
      <Quadrant>
        <FirstQuadrant tasks={tasks} />
        <SecondQuadrant tasks={tasks} />
        <ThirdQuadrant tasks={tasks} />
        <FourthQuadrant tasks={tasks} />
      </Quadrant>
      <TaskBoard
        tasks={tasks.filter((task) => task.quadrantId === "task-board")}
      />
      <DoneBoard
        tasks={tasks.filter((task) => task.quadrantId === "done-board")}
        disableDnd={false}
      />
      <DragOverlay>
        {activeTask ? <TaskItem task={activeTask} /> : null}
      </DragOverlay>
    </Container>
  );
};
export default Board;
