import QuadrantElement from "@/components/quadrant/QuadrantElement";
import { Task } from "@/types";

interface Props {
  tasks: Task[];
}

const SecondQuadrant = ({ tasks }: Props) => {
  return (
    <QuadrantElement
      title="Schedule it"
      subtitle="Less urgent, but important"
      row={1}
      column={2}
      type="second-quadrant"
      tasks={tasks.filter((task) => task.quadrantId === "second-quadrant")}
    />
  );
};

export default SecondQuadrant;
