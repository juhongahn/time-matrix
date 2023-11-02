import QuadrantElement from "@/components/quadrant/QuadrantElement";
import { Task } from "@/types";

interface Props {
  tasks: Task[];
}

const FourthQuadrant = ({ tasks }: Props) => {
  return (
    <QuadrantElement
      title="Delete it"
      subtitle="Neither urgent not important"
      row={2}
      column={2}
      type="fourth-quadrant"
      tasks={tasks.filter((task) => task.quadrantId === "fourth-quadrant")}
    />
  );
};

export default FourthQuadrant;
