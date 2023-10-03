import styled from "styled-components";

interface Props {
  title: string;
  row: number;
  column: number;
}

const Container = styled.div<{ $row: number; $column: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  grid-row: ${(props) => props.$row};
  grid-column: ${(props) => props.$column};
`;

const Header = styled.h3``;

const Body = styled.div``;

function QuadrantElement({ title, row, column }: Props) {
  return (
    <Container $row={row} $column={column}>
      <Header>{title}</Header>
      <Body>요소</Body>
    </Container>
  );
}

export default QuadrantElement;
