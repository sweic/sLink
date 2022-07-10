import styled from "styled-components";
interface ModalProps {
  opened: boolean;
}
export const PreviewContainer = styled.div`
  position: relative;
  flex: 0 0 380px;
  display: flex;
  justify-content: center;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.1);
  @media (max-width: 800px) {
    display: none;
  }
`;
export const PreviewContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const UserPageContainer = styled.div`
  width: 360px;
  margin-top: 1em;
  transform: scale(0.8);
  outline: 1em black solid;
  position: relative;
  border-radius: 1em;
  overflow-y: auto;
  min-height: 673px;
`;

export const PreviewHeader = styled.div`
  width: 100%;
  background-color: white;
  min-height: 48px;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  padding: 1em;
  align-items: center;
  gap: 0.2em;
`;

export const PreviewModal = styled.div<ModalProps>`
  position: fixed;
  left: 0;
  top: 0;
  margin-right: 10em;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: transparent;
  background: rgba(9, 30, 66, 0.54);
  overflow-y: auto;
  display: ${(props) => (props.opened ? "block" : "none")};
  opacity: ${(props) => (props.opened ? 1 : 0)};
  transition: opacity 1s ease-in-out;
`;

export const MobilePreviewContainer = styled.div`
  margin: 0.5em;
  flex: 0 1 560px;
  background-color: white;
  height: calc(100% - 1em);
`;

export const PreviewCloseBox = styled.div`
  position: absolute;
  right: 1em;
  top: 1em;
  background-color: white;
  border-radius: 12px;
  padding: 0.1em;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
