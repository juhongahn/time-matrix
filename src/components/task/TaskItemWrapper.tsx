import { Task, WarningState } from "@/types";
import TaskItem from "./TaskItem";
import SecondQuadrantTaskItem from "./SecondQuadrantTaskItem";
import { useState } from "react";
import ThirdQuadrantTaskItem from "./ThirdQuadrantTaskItem";

interface Props {
  task: Task;
}

const TaskItemWrapper = ({ task }: Props) => {
  const [warningState, setWarningState] = useState<WarningState>({
    message: "",
    warning: false,
  });

  const warningStateHandler = (inputWarningState: WarningState) => {
    setWarningState(inputWarningState);
  };

  return generateTaskItemByQuadrant(task, warningState, warningStateHandler);
};

function generateTaskItemByQuadrant(
  task: Task,
  warningState: WarningState,
  warningHandler: (inputWarningState: WarningState) => void
) {
  switch (task.quadrantId) {
    case "second-quadrant":
      return (
        <SecondQuadrantTaskItem
          task={task}
          warningState={warningState}
          warningHandler={warningHandler}
        />
      );
    case "third-quadrant":
      return (
        <ThirdQuadrantTaskItem
          task={task}
          warningState={warningState}
          warningHandler={warningHandler}
        />
      );
    default:
      return <TaskItem task={task} />;
  }
}

export function checkContentsIsNullOrEmpty(target?: string) {
  return !target || target.length === 0;
}

export default TaskItemWrapper;
