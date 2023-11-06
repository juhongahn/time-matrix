import useDoneTasksQuery, {
  GroupedTasksByDoneDate,
} from "@/hooks/useDoneTasksQuery";
import { useState } from "react";
import { Line, LineChart, Tooltip, XAxis } from "recharts";
import styled from "styled-components";
import { Task } from "@/types";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const ChartWrapper = styled.div`
  display: inline-block;

  border: 1px solid rgb(216, 222, 228);
  background-color: rgb(246, 248, 250);
  border-radius: 10px;
`;

interface Props {
  activeTasksHandler: (tasks: Task[]) => void;
}

const DoneChart = ({ activeTasksHandler }: Props) => {
  const { data: groupedTasks = [] } = useDoneTasksQuery();
  return (
    <Container>
      <ChartWrapper>
        <LineChart
          width={800}
          height={300}
          data={groupedTasks}
          margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
        >
          <XAxis
            dataKey="doneAt"
            interval={0}
            tick={
              <DoneTaskAxisTick
                data={groupedTasks}
                activeTasksHandler={activeTasksHandler}
              />
            }
          />
          <Tooltip content={<DoneTaskTooltip />} />
          <Line dataKey="count" stroke="#ff5544" strokeWidth={2.5} />
        </LineChart>
      </ChartWrapper>
    </Container>
  );
};

const TooltipContainer = styled.div`
  border: 1px solid #e0e5ee;
  padding: 12px;
  background-color: white;
`;

const TooltipLabel = styled.p`
  font-size: 12px;
  color: #909090;
  font-weight: 700;
`;

const TooltipValue = styled.p`
  font-size: 18px;
  font-weight: 700;
`;

const DoneTaskTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <TooltipContainer>
        <TooltipLabel>완료한 작업 수</TooltipLabel>
        <TooltipValue>{payload[0].payload.count}</TooltipValue>
      </TooltipContainer>
    );
  }

  return null;
};

const XAxisTick = styled.text`
  font-size: 11px;
`;

const AxisTickRect = styled.rect`
  fill: transparent;

  &:hover {
    cursor: pointer;
  }
`;

const DoneTaskAxisTick = ({
  x,
  y,
  payload,
  index,
  activeTasksHandler,
  data,
}: any) => {
  const [isMouseOver, setMouseOver] = useState<boolean>(false);
  const radius = 10;

  const currentDate = getKRDate();
  const targetDate = getKRDate(payload.value);
  const day = targetDate.getDate();
  const month = targetDate.getMonth() + 1;
  return (
    <g transform={`translate(${x},${y})`}>
      {isMouseOver && (
        <circle cx={0} cy={0 + radius + 10 / 2} r={radius} fill="#ff5544" />
      )}
      <XAxisTick
        x={0}
        y={0 + radius + 10}
        textAnchor="middle"
        fill={isMouseOver ? "white" : "#909090"}
      >
        {isSameDay(currentDate, targetDate) ? "오늘" : day}
      </XAxisTick>
      {(index === 0 || day === 1) && (
        <XAxisTick x={0} y={40} textAnchor="middle" fill="#909090">
          {month}월
        </XAxisTick>
      )}
      <AxisTickRect
        width={24}
        height={300}
        x={-12}
        y={-y}
        onMouseEnter={handleMouseEnter}
        onMouseOut={handleMouseOut}
        onClick={() => clickHandler(data as GroupedTasksByDoneDate[])}
      />
    </g>
  );

  function handleMouseEnter() {
    setMouseOver(true);
  }

  function handleMouseOut() {
    setMouseOver(false);
  }

  function clickHandler(data: GroupedTasksByDoneDate[]) {
    const activeData = data.find(
      (doneTask) => doneTask.doneAt === payload.value
    );
    activeTasksHandler(activeData?.tasks ? activeData.tasks : []);
  }
};

function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function getKRDate(isoDate?: string) {
  if (!isoDate)
    return new Date(
      new Date().toLocaleDateString("en-US", { timeZone: "Asia/Seoul" })
    );
  const date = new Date(isoDate);
  const koreanTimeDate = new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Seoul" })
  );
  return koreanTimeDate;
}

export default DoneChart;
