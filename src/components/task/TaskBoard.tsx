import {
  useTaskInputActions,
  useTaskInputState,
} from "@/contexts/TaskInputContext";
import { useMemo } from "react";
import { SortableContext } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import styled from "styled-components";

import TaskItem from "@/components/task/TaskItem";
import Header from "@/components/ui/Header";
import TaskCreateForm from "@/components/task/TaskCreateForm";
import { Task } from "@/types";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons/faCirclePlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  tasks: Task[];
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
  height: 0px;

  padding: 1rem;
  padding-top: 0;
  overflow-y: auto;
  
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Footer = styled.div`
  width: 100%;
  background-color: rgb(246, 248, 250);
`;

const AddTaskButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  padding-left: 1rem;
  
  color: rgb(101, 109, 118);
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
  text-align: start;

  & span {
    margin-left: 0.5rem;
  }
  &:hover {
    background-color: rgb(243, 244, 246);
  }
`;

const TaskBoard = ({ tasks }: Props) => {
  const taskInputValue = useTaskInputState();
  const taskIdList = useMemo(() => tasks.map((task) => task.id), [tasks]);
  const { setNodeRef } = useDroppable({
    id: "task-board",
    data: {
      type: "Quadrant",
      accecpts: ["Task"],
    },
  });
  const actions = useTaskInputActions();
  const { openTaskInput, onChange, onSubmit } = actions;
  const onFormToggle = () => openTaskInput("");

  return (
    <Container>
      <Header
        className="task-board-header"
        title={"Task"}
        subtitle="My tasks"
        counter={tasks.length}
        type="task-board"
      />
      <Body ref={setNodeRef}>
        <SortableContext items={taskIdList}>
          {tasks
            .filter((task) => task.quadrantId === "task-board")
            .map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
        </SortableContext>
      </Body>
      <Footer>
        {taskInputValue.visible ? (
          <TaskCreateForm
            onChange={onChange}
            onSubmit={onSubmit}
            value={taskInputValue.value}
          />
        ) : (
          <AddTaskButton onClick={onFormToggle}>
            <FontAwesomeIcon icon={faCirclePlus} />
            <span>Add Task</span>
          </AddTaskButton>
        )}
      </Footer>
    </Container>
  );
};

export default TaskBoard;
