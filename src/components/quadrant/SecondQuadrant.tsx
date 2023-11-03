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
      tasks={tasks
        .filter((task) => task.quadrantId === "second-quadrant")
        .sort((task1, task2) => sortingByDate(task1.deadLine, task2.deadLine))}
    />
  );
};

function sortingByDate(d1: string | undefined, d2: string | undefined) {
  if (!d1 && !d2) return 0;
  else if (!d1) return 1;
  else if (!d2) return -1;

  const date1 = new Date(d1).getTime();
  const date2 = new Date(d2).getTime();

  if (date1 > date2) return 1;
  if (date1 < date2) return -1;
  return 0;
}

export default SecondQuadrant;
