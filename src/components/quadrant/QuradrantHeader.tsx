import styled from "styled-components";

import { faCalendar } from "@fortawesome/free-solid-svg-icons/faCalendar";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons/faCircleCheck";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons/faTrashCan";
import { faUserClock } from "@fortawesome/free-solid-svg-icons/faUserClock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  title: string;
  type: string;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0;
`;

const Header = styled.h1`
  text-align: center;
  margin: 0;
`;


function QudarantHeader({ title, type }: Props) {
  return (
    <Container>
      {getIconComponentByType(type)}
      <Header>{title}</Header>
    </Container>
  );
}

const getIconComponentByType = (type: string) => {
  switch (type) {
    case "first-quadrant":
      return <FontAwesomeIcon icon={faCircleCheck} size="2xl" />;
    case "second-quadrant":
      return <FontAwesomeIcon icon={faCalendar} size="2xl" />;
    case "third-quadrant":
      return <FontAwesomeIcon icon={faUserClock} size="2xl" />;
    default:
      return <FontAwesomeIcon icon={faTrashCan} size="2xl" />;
  }
};

export default QudarantHeader;
