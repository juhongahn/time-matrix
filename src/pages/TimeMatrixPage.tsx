import styled from "styled-components";
import QuadrantElement from "../components/QuadrantElement";

const Quadrant = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  height: 100vh;
  width: 100vw;
`;

function TimeMatrixPage() {
  return (
    <Quadrant>
      <QuadrantElement title="1 사분면" row={1} column={1} />
      <QuadrantElement title="2 사분면" row={1} column={2} />
      <QuadrantElement title="3 사분면" row={2} column={1} />
      <QuadrantElement title="4 사분면" row={2} column={2} />
    </Quadrant>
  );
}

export default TimeMatrixPage;
