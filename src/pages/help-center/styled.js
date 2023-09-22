import styled from "styled-components/macro";

export const Wrapper = styled.div`
  background-color: #fff;
  position: sticky;
  left: 0;
  top: 0;
  max-width: 272px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #e5e5e5;
`;

export const PlaceHolder = styled.div`
  display: flex;
  height: 64px;
  background-color: rgba(255, 255, 255, 1);
  border-bottom: 1px solid rgba(236, 234, 235, 1);
`;

export const InfoHolder = styled.div`
  padding: 20px;
`;

export const ChapterText = styled.p`
  overflow: hidden;
  padding: 10px 5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 240px;
  max-height: 40px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    color: #727d97;
  }
`;

export const MainWrapper = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
