import styled from "styled-components";

interface Props {
  title: string;
  subtitle: string;
  type: string;
  counter?: number;
  className?: string;
}

const Container = styled.div`
  margin-bottom: 1rem;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0;
`;

const Title = styled.h3`
  margin: 0;
  margin-right: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 0.75rem;
  color: var(--color-gray-500);
  margin: 0;
`;

const TaskCounter = styled.span`
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 600;
  line-height: 1;
  color: rgb(101, 109, 118);

  border-radius: 20px;
  background-color: rgba(175, 184, 193, 0.2);
  padding: 0.2rem 0.3rem;
`;

const Icon = styled.div<{ $color: Color }>`
  background-color: ${(props) =>
    props.$color ? props.$color.backgroundColor : "rgb(221, 244, 255)"};
  border-color: ${(props) =>
    props.$color ? props.$color.borderColor : "#dddddd"};
  border-width: 2px;
  border-style: solid;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  margin-right: 0.45rem;
`;

const Header = ({ title, subtitle, type, counter, className }: Props) => {
  return (
    <Container className={className}>
      <TitleContainer>
        <Icon $color={getIconColor(type)} />
        <Title>{title}</Title>
        <TaskCounter>{counter}</TaskCounter>
      </TitleContainer>
      <Subtitle>{subtitle}</Subtitle>
    </Container>
  );
};

type Color = {
  backgroundColor: string;
  borderColor: string;
};

const getIconColor = (type: string): Color => {
  switch (type) {
    case "first-quadrant":
      return {
        backgroundColor: "rgb(218, 251, 225)",
        borderColor: "rgb(31, 136, 61)",
      };
    case "second-quadrant":
      return {
        backgroundColor: "rgb(221, 244, 255)",
        borderColor: "rgb(9, 105, 218)",
      };
    case "third-quadrant":
      return {
        backgroundColor: "rgb(255, 248, 197)",
        borderColor: "rgb(154, 103, 0)",
      };
    case "fourth-quadrant":
      return {
        backgroundColor: "rgb(251, 231, 231)",
        borderColor: "rgb(255, 36, 36)",
      };
    case "done-board":
      return {
        backgroundColor: "rgb(251, 239, 255)",
        borderColor: "rgb(130, 80, 223)",
      };
    default:
      return {
        backgroundColor: "rgb(241, 240, 240)",
        borderColor: "rgb(135, 135, 135)",
      };
  }
};

export default Header;
