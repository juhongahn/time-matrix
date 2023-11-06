import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { useTaskInputActions } from "@/contexts/TaskInputContext";
import { useTaskItemActions } from "@/contexts/TaskItemActionsContext";
import { CSS } from "@dnd-kit/utilities";
import styled, { css } from "styled-components";

import { Task, WarningState } from "@/types";
import Checkbox from "@/components/ui/Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons/faTrashCan";
import TaskHeader from "@/components/task/TaskHeader";

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

  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`;

const TaskBody = styled.div`
  display: flex;
  align-items: center;

  & .check-box {
    margin-right: 0.5rem;
  }
`;

export const Todo = styled.p<{ $checked?: boolean; $learnMore: boolean }>`
  flex-grow: 1;

  font-size: 0.75rem;
  text-decoration: ${(props) => props.$checked && "line-through"};

  &:hover {
    cursor: pointer;
  }

  ${(props) =>
    !props.$learnMore &&
    css`
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    `}
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 0.1rem;

  margin-left: 0.4rem;
`;

const DraggingPlaceHolder = styled.div`
  width: 100%;
  height: 5px;
  margin-bottom: 0.5rem;

  background-color: rgb(9, 105, 218);
  border-radius: 16px;

  z-index: 100;
`;

export const Button = styled.button`
  padding: 0;
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
`;

const TaskItem = ({ task, warningState, icon }: Props) => {
  const [learnMore, setLearnMore] = useState<boolean>(false);
  const {
    setNodeRef,
    isDragging,
    attributes,
    listeners,
    transform,
    transition,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const { deleteTask, toggleDoneTask } = useTaskItemActions();
  const { setEditMode } = useTaskInputActions();

  if (isDragging) {
    return <DraggingPlaceHolder />;
  }
  return (
    <Container
      ref={setNodeRef}
      $warning={warningState?.warning}
      style={style}
      {...attributes}
      {...listeners}
    >
      <TaskHeader task={task} warningState={warningState} />
      <TaskBody>
        <Checkbox
          checked={task.done}
          className="check-box"
          onClick={() => toggleDoneTask(task)}
        />
        <Todo
          $checked={task.done}
          $learnMore={learnMore}
          onClick={() => setLearnMore(!learnMore)}
        >
          {task.task}
        </Todo>
        <ButtonBox>
          {icon && icon}
          <Button onClick={() => setEditMode(task)}>
            <FontAwesomeIcon
              icon={faPenToSquare}
              size="lg"
              style={{ color: "green" }}
            />
          </Button>
          <Button onClick={() => deleteTask(task)}>
            <FontAwesomeIcon
              icon={faTrashCan}
              size="lg"
              style={{ color: "red" }}
            />
          </Button>
        </ButtonBox>
      </TaskBody>
    </Container>
  );
};

export default TaskItem;
