import QuadrantElement from "@/components/quadrant/QuadrantElement";
import { Task } from "@/types";

interface Props {
  tasks: Task[];
}

const ThirdQuadrant = ({ tasks }: Props) => {
  return (
    <QuadrantElement
      title="Delegate it"
      subtitle="Urgent, but less important"
      row={2}
      column={1}
      type="third-quadrant"
      tasks={tasks.filter((task) => task.quadrantId === "third-quadrant")}
    />
  );
};

export default ThirdQuadrant;
