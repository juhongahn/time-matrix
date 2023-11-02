import { useEffect, useRef, useState } from "react";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { useTaskItemActions } from "@/contexts/TaskItemActionsContext";
import styled from "styled-components";

import { Task, WarningState } from "@/types";
import TaskItem, { Button } from "@/components/task/TaskItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons/faUserPlus";
import { checkContentsIsNullOrEmpty } from "@/components/task/TaskItemWrapper";

interface Props {
  task: Task;
  warningState: WarningState;
  warningHandler: (inputWarningState: WarningState) => void;
}

const ThirdQuadrantTaskItem = ({
  task,
  warningState,
  warningHandler,
}: Props) => {
  useEffect(() => {
    checkTrdQuadItemIsWarning(task, warningState);
  }, [task]);

  return (
    <TaskItem
      task={task}
      warningState={warningState}
      icon={<TrdQuadTaskItemIcon task={task} />}
    />
  );

  function checkTrdQuadItemIsWarning(task: Task, warning: WarningState) {
    if (checkContentsIsNullOrEmpty(task.assignedPerson) && !warning.warning) {
      warningHandler({ message: "당담자를 할당해 주세요", warning: true });
    }
    if (!checkContentsIsNullOrEmpty(task.assignedPerson) && warning.warning) {
      warningHandler({ message: "", warning: false });
    }
  }
};

const PopUpInputContainer = styled.form`
  position: fixed;

  background-color: white;
  border-radius: 6px;
  box-shadow: rgb(208, 215, 222) -1px 0px 0px 0px inset,
    rgb(208, 215, 222) 1px 0px 0px 0px inset,
    rgb(208, 215, 222) 0px 1px 0px 0px inset,
    rgb(208, 215, 222) 0px -1px 0px 0px inset,
    rgba(140, 149, 159, 0.15) 0px 3px 6px;
`;

const PopUpInput = styled.input`
  padding: 0.5rem;

  border: 0px;
  background-color: transparent;
  border-radius: 6px;
  box-shadow: none;
  outline: none;

  &:focus {
    border: 2px solid rgb(9, 105, 218);
  }
`;

interface ItemProps {
  task: Task;
}

const TrdQuadTaskItemIcon = ({ task }: ItemProps) => {
  const { setAssignedPerson } = useTaskItemActions();

  const assignPersonButtomRef = useRef<HTMLFormElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [assignedPersonName, setAssignedPersonName] = useState<string>("");

  const onClickHandler = () => setIsOpen(!isOpen);
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAssignedPersonName(e.target.value);
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAssignedPerson(task, assignedPersonName);
    setAssignedPersonName("");
    setIsOpen(false);
  };

  useOnClickOutside(assignPersonButtomRef, () => {
    setIsOpen(!isOpen);
  });

  return (
    <div>
      <Button onClick={onClickHandler}>
        <FontAwesomeIcon
          icon={faUserPlus}
          size="lg"
          style={{ color: "orange" }}
        />
      </Button>
      {isOpen && (
        <PopUpInputContainer
          ref={assignPersonButtomRef}
          onSubmit={onSubmitHandler}
        >
          <PopUpInput
            value={assignedPersonName}
            onChange={onChangeHandler}
            autoFocus
            placeholder="담당자 명을 입력해 주세요"
          />
        </PopUpInputContainer>
      )}
    </div>
  );
};

export default ThirdQuadrantTaskItem;
