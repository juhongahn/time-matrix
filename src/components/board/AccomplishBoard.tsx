import { useState } from "react";
import styled from "styled-components";

import ChartHeader from "@/components/chart/ChartHeader";
import DoneChart from "@/components/chart/DoneChart";
import DoneBoard from "@/components/task/DoneBoard";
import { Task } from "@/types";

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  margin: 0.5rem;
`;

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const AccomplishBoard = () => {
  const [activeTasks, setActiveTasks] = useState<Task[]>([]);
  const activeTasksHandler = (tasks: Task[]) => {
    setActiveTasks(tasks);
  };
  return (
    <Container>
      <ChartContainer>
        <ChartHeader />
        <DoneChart activeTasksHandler={activeTasksHandler} />
      </ChartContainer>
      <DoneBoard tasks={activeTasks} disableDnd={true} width={380} />
    </Container>
  );
};

export default AccomplishBoard;
