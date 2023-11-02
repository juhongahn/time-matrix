import { useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { useTaskInputActions } from "@/contexts/TaskInputContext";

interface Props {
  value: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Container = styled.div`
  width: 100%;
  padding: 0.5rem;

  position: absolute;
  bottom: 0;
`;

const TaskForm = styled.form`
  width: 100%;
  height: 45px;
  max-height: 45px;

  background-color: rgb(255, 255, 255);
  border-radius: 6px;
  box-shadow: rgb(208, 215, 222) -1px 0px 0px 0px inset,
    rgb(208, 215, 222) 1px 0px 0px 0px inset,
    rgb(208, 215, 222) 0px 1px 0px 0px inset,
    rgb(208, 215, 222) 0px -1px 0px 0px inset,
    rgba(140, 149, 159, 0.15) 0px 3px 6px;
`;

const TaskInput = styled.input`
  width: 100%;
  height: 100%;

  font-size: 14px;
  color: rgb(31, 35, 40);
  border: 0px;
  background-color: transparent;
  border-radius: 6px;

  padding: 0px 0px 0px 20px;
  box-shadow: none;
  outline: none;

  &:focus {
    border: 3px solid rgb(9, 105, 218);
  }
`;

const TaskCreateForm = ({ value, onSubmit, onChange }: Props) => {
  const inputRef = useRef<HTMLFormElement>(null);
  const taskInputActions = useTaskInputActions();
  useOnClickOutside(inputRef, () => {
    taskInputActions?.closeTaskInput();
  });
  return (
    <>
      {createPortal(
        (<Container>
          <TaskForm ref={inputRef} onSubmit={onSubmit}>
            <TaskInput
              autoFocus
              placeholder="할 일을 입력 후, Enter 를 누르세요"
              value={value}
              onChange={onChange}
            />
          </TaskForm>
        </Container>),
        document.body
      )}
    </>
  );
};

export default TaskCreateForm;
