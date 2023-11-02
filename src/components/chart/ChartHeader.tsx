import useDoneTaskCountsQuery from "@/hooks/useDoneTaskCountsQuery";
import styled from "styled-components";

const Container = styled.div`
  width: 800px;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  border: 1px solid rgb(216, 222, 228);
  background-color: rgb(246, 248, 250);
  border-radius: 10px;
`;

const ValueBoxContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;
`;

const Header = styled.h2`
  text-align: center;
  margin: 0;
`;

const DoneTaskBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const LabelParagraph = styled.p`
  color: #555555;
  font-size: 0.9rem;
  font-weight: 600;
`;

const ValueParagraph = styled.p`
  font-weight: 700;
  font-size: 1.3rem;
  text-align: center;
`;

const ChartHeader = () => {
  const { data } = useDoneTaskCountsQuery();
  return (
    <Container>
      <Header>Completed Tasks</Header>
      <ValueBoxContainer>
        <DoneTaskBox>
          <LabelParagraph>Today</LabelParagraph>
          <ValueParagraph>{data ? data.doneToday : 0}</ValueParagraph>
        </DoneTaskBox>
        <DoneTaskBox>
          <LabelParagraph>Yesterday</LabelParagraph>
          <ValueParagraph>{data ? data.doneYesterday : 0}</ValueParagraph>
        </DoneTaskBox>
        <DoneTaskBox>
          <LabelParagraph>Total</LabelParagraph>
          <ValueParagraph>{data ? data.totalCount : 0}</ValueParagraph>
        </DoneTaskBox>
      </ValueBoxContainer>
    </Container>
  );
};

export default ChartHeader;
