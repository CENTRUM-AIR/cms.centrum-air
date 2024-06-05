import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  position: relative;
  padding: ${({ padding }) => padding || "0 10px"};
  border-radius: ${({ borderRadius }) => borderRadius || "15px"};
  width: ${({ width }) => width};
  height: ${({ height }) => (height ? height : "50px")};
  background-color: ${({ main }) =>
    main ? "rgba(255, 255, 255, 0.2)" : "none"};
  background-color: ${({ bcolor }) => bcolor};
  border: ${({ main }) => (main ? "none" : "1px solid #DDE5F6")};
  border: ${({ borderColor }) => `${borderColor} 1px solid`};
  border: ${({ error }) => error && `1px solid #d32f2f}`};

  @media (max-width: "992px") {
    background-color: ${({ colorChange }) => colorChange && "#F3F6FC"};
    border: ${({ colorChange }) => colorChange && "none"};
    /* width: 100%; */
  }
`;
export const StyledInput = styled.input`
  width: 100%;
  font-family: "CocoSharp", sans-serif;
  border: none;
  background-color: transparent;
  color: ${({ main }) => (main ? "#fff" : "#141414")} !important;
  font-size: 14px;
  font-weight: 500;
  ::placeholder {
    color: ${({ main }) => (main ? "#fff" : "#727D97")} !important;
    font-size: 14px;
  }
  &:focus {
    outline: none;
  }
`;
