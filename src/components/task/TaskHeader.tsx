import { Task, WarningState } from "@/types";
import styled from "styled-components";

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & .task-title {
    font-size: 0.8rem;
    color: var(--color-gray-500);
  }
`;

export const Message = styled.span`
  font-size: 0.75rem;
  color: var(--color-gray-500);
`;

const WarningMessage = styled(Message)`
  color: red;
`;

interface Props {
  task: Task;
  warningState?: WarningState;
}

const TaskHeader = ({ task, warningState }: Props) => {
  return (
    <Header>
      <span className="task-title">
        {switchQuadIdToItemTitle(task.quadrantId)}
      </span>
      {task.quadrantId !== "done-board" ? (
        warningState?.warning ? (
          <WarningMessage>{warningState.message}</WarningMessage>
        ) : task.quadrantId === "second-quadrant" && task.deadLine ? (
          <Message>{formatDateToYYYYMMDDHHMM(task.deadLine)}</Message>
        ) : (
          task.quadrantId === "third-quadrant" &&
          task.assignedPerson && <Message>{task.assignedPerson}</Message>
        )
      ) : (
        <Message>{formatDateToYYYYMMDDHHMM(task.doneAt!)}</Message>
      )}
    </Header>
  );
};

export default TaskHeader;

function switchQuadIdToItemTitle(quadId: string) {
  switch (quadId) {
    case "first-quadrant":
      return "1st quadrant";
    case "second-quadrant":
      return "2nd quadrant";
    case "third-quadrant":
      return "3th quadrant";
    case "fourth-quadrant":
      return "4th quadrant";
    case "task-board":
      return "A task to do";
    case "done-board":
      return "Done task";
    default:
      return "";
  }
}

function formatDateToYYYYMMDDHHMM(strDate: string) {
  const date = new Date(strDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${year}.${month}.${day} ${hour}:${minute}`;
}
