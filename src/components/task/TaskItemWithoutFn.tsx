import styled from "styled-components";

import { Task, WarningState } from "@/types";
import { useState } from "react";
import { Todo } from "@/components/task/TaskItem";
import TaskHeader from "./TaskHeader";

interface Props {
  task: Task;
  warningState?: WarningState;
  icon?: React.ReactNode;
}

const Container = styled.div<{ $warning?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.5rem;

  padding: 0.8rem;
  background-color: rgb(255, 255, 255);
  border-style: solid;
  color: rgb(31, 35, 40);

  border-radius: 6px;
  border: 1px solid;
  border-color: ${(props) => (props.$warning ? "red" : "rgb(216, 222, 228)")};
  box-shadow: rgba(140, 149, 159, 0.15) 0px 3px 6px;
`;

const TaskBody = styled.div`
  display: flex;
  align-items: center;

  & .check-box {
    margin-right: 0.5rem;
  }
`;

const TaskItemWithoutFn = ({ task }: Props) => {
  const [learnMore, setLearnMore] = useState<boolean>(false);
  return (
    <Container>
      <TaskHeader task={task} />
      <TaskBody>
        <Todo $learnMore={learnMore} onClick={() => setLearnMore(!learnMore)}>
          {task.task}
        </Todo>
      </TaskBody>
    </Container>
  );
};

export default TaskItemWithoutFn;
