import styled from "styled-components";

export const ProfileBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1em;
`;
export const ProfileEditContainer = styled.div`
  flex: 1 0 372px;
  background-color: white;
  border-radius: 2em;
  border: rgb(0, 0, 0, 0.1);
  height: 300px;
  padding-top: 1.5em;
  padding-left: min(1.5em, 2vw);
  padding-right: min(1.5em, 2vw);
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin-bottom: 1.5em;
`;

export const ProfileThumbnailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 96px;
  height: 96px;
  align-self: center;
`;
export const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 100%;
`;

export const ProfileInfoInput = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProfileThumbnailOverlay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 96px;
  height: 96px;
  z-index: 999;
  border-radius: 3em;
  opacity: 0;
  cursor: pointer;
  background-color: black;
  &:hover {
    opacity: 0.3 !important;
  }
`;
