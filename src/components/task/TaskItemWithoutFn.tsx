import styled from "styled-components";

import { Task, WarningState } from "@/types";

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

  padding: 1rem;
  padding-bottom: 0.8rem;
  background-color: rgb(255, 255, 255);
  border-style: solid;
  color: rgb(31, 35, 40);

  border-radius: 6px;
  border: 1px solid;
  border-color: ${(props) => (props.$warning ? "red" : "rgb(216, 222, 228)")};
  box-shadow: rgba(140, 149, 159, 0.15) 0px 3px 6px;
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;


const TaskBody = styled.div`
  display: flex;
  align-items: center;

  & .check-box {
    margin-right: 0.5rem;
  }
`;
const Todo = styled.p<{ $checked?: boolean }>`
  font-size: 0.8rem;
  flex-grow: 1;
  text-decoration: ${(props) => props.$checked && "line-through"};
`;




const TaskItemWithoutFn = ({ task }: Props) => {
  return (
    <Container>
      <TaskHeader>
        <span>{task.quadrantId}</span>
      </TaskHeader>
      <TaskBody>
        <Todo>{task.task}</Todo>
      </TaskBody>
    </Container>
  );
};

export default TaskItemWithoutFn;
