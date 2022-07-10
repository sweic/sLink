import styled from "styled-components";

export const LinksContainer = styled.div`
  height: 100%;
  width: 100%;
  display: block;
`;

export const LinkBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
  gap: 1.5em;
`;

export const LinkNodeContainer = styled.div`
  width: 100%;
  height: 120px;
  background-color: white;
  border: 1px rgb(0, 0, 0, 0.2);
  border-radius: 2em;
  padding-left: min(1.5em, 2vw);
  font-size: 13px;
  margin-bottom: 1.5em;
  flex-wrap: nowrap;
`;

export const LinkNodeInputs = styled.div`
  padding-top: 1.5em;

  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 80%;
  flex: 1 1 220px;
  gap: 0.5em;
`;

export const LinkNodeThumbnail = styled.div`
  height: 54px;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 54px;
  position: relative;
`;

export const LinkNodeContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  gap: 1em;
  padding-right: min(1em, 2vw);
  height: 100%;
`;

export const LinkNodeDragHandle = styled.div`
  height: 120px;
  background-color: white;
  border-top-right-radius: 2em;
  border-bottom-right-radius: 2em;
  flex-direction: column;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const LinkNodeThumbnailOverlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 54px;
  height: 54px;
  z-index: 99;
  border-radius: 1em;
  opacity: 0;
  cursor: pointer;
  background-color: black;
  &:hover {
    opacity: 0.3 !important;
  }
`;
export const PreviewButton = styled.div`
  display: none;
  @media (max-width: 800px) {
    display: flex !important;
  }
  > * {
    flex-grow: 1;
  }
`;

export const LinksButtonGroup = styled.div`
  width: 100%;
  display: flex;
  gap: 0.5em;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  > * {
    flex-grow: 1;
  }
`;
