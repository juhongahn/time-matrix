import styled from "styled-components";

const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.svg`
  fill: none;
  stroke: green;
  stroke-width: 2px;
`;

const StyledCheckBox = styled.div<{ $checked: boolean }>`
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  border: ${(props) => (props.$checked ? "none" : "solid 0.1rem #dddddd")};
  border-radius: 100%;
  transition: all 150ms;

  ${Icon} {
    visibility: ${(props) => (props.$checked ? "visible" : "hidden")};
  }

  cursor: pointer;
`;

const HiddenCheckBox = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

interface Props {
  checked: boolean;
  className?: string;
  onClick: () => void;
}

const Checkbox = ({ className, checked, onClick, ...props }: Props) => {
  return (
    <CheckBoxContainer className={className} onClick={onClick}>
      <HiddenCheckBox type={"checkbox"} checked={checked} {...props} readOnly/>
      <StyledCheckBox $checked={checked}>
        <Icon viewBox="0 0 24 24">
          <polyline points="19 7 10 17 5 12" />
        </Icon>
      </StyledCheckBox>
    </CheckBoxContainer>
  );
};

export default Checkbox;
