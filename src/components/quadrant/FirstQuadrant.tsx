import QuadrantElement from "./QuadrantElement";
import { Task } from "@/types";

interface Props {
  tasks: Task[];
}

const FirstQuadrant = ({ tasks }: Props) => {
  return (
    <QuadrantElement
      title="Do it"
      subtitle="Urgent and Important"
      row={1}
      column={1}
      type="first-quadrant"
      tasks={tasks.filter((task) => task.quadrantId === "first-quadrant")}
    />
  );
};

export default FirstQuadrant;
