import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import { checkContentsIsNullOrEmpty } from "@/components/task/TaskItemWrapper";

import { Task, WarningState } from "@/types";
import TaskItem, { Button } from "@/components/task/TaskItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons/faCalendarPlus";
import { useTaskItemActions } from "@/contexts/TaskItemActionsContext";

interface Props {
  task: Task;
  warningState: WarningState;
  warningHandler: (inputWarningState: WarningState) => void;
}

const ItemContainer = styled.div`
  position: relative;
`;

const DatePickerContainer = styled.div`
  position: fixed;
  z-index: 100;
`;

const SecondQuadrantTaskItem = ({
  task,
  warningState,
  warningHandler,
}: Props) => {
  useEffect(() => {
    checkSndQuadItemIsWarning(task, warningState);
  }, [task, task.deadLine]);
  return (
    <TaskItem
      task={task}
      warningState={warningState}
      icon={<SndQuadTaskItemDatePicker task={task} />}
    />
  );
  function checkSndQuadItemIsWarning(task: Task, warningState: WarningState) {
    if (checkContentsIsNullOrEmpty(task.deadLine) && !warningState.warning) {
      warningHandler({ message: "마감 날짜를 설정해 주세요", warning: true });
    }
    if (checkIsDeadlineOver(task.deadLine!) && !warningState.warning) {
      warningHandler({ message: "마감 기간이 지났습니다", warning: true });
    }
    if (
      !checkContentsIsNullOrEmpty(task.deadLine) &&
      warningState.warning &&
      !checkIsDeadlineOver(task.deadLine!)
    ) {
      warningHandler({ message: "", warning: false });
    }
  }
};

function checkIsDeadlineOver(stringDeadline: string) {
  const deadline = new Date(stringDeadline).getTime();
  const today = Date.now();
  return deadline < today;
}

interface DatePickerProps {
  task: Task;
}

const SndQuadTaskItemDatePicker = ({ task }: DatePickerProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const { setDeadLine } = useTaskItemActions();

  useOnClickOutside(datePickerRef, () => {
    setIsOpen(!isOpen);
  });

  const handleChange = (date: Date | null) => {
    setIsOpen(!isOpen);
    if (!date) return;
    setStartDate(date);
    setDeadLine(task, date);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <ItemContainer>
      <Button>
        <FontAwesomeIcon
          icon={faCalendarPlus}
          size="lg"
          style={{ color: "blue" }}
          onClick={handleClick}
        />
      </Button>
      {isOpen && (
        <DatePickerContainer ref={datePickerRef}>
          <DatePicker
            selected={startDate}
            onChange={handleChange}
            showTimeSelect
            timeFormat="HH:mm"
            inline
            locale={ko}
          />
        </DatePickerContainer>
      )}
    </ItemContainer>
  );
};

export default SecondQuadrantTaskItem;
