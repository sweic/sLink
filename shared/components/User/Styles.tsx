import styled from "styled-components";
export const UserPageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

export const UserPageContent = styled.div`
  display: block;
  height: 100%;
  flex: 0 1 560px;
  padding-top: 2.5em;
`;

export const UserPageInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
`;

export const UserPageInfoDetails = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UserPageTitle = styled.h1`
    font-size: 16px;
    text-align: center;
    font-weight: bold;
    max-width: 100%;
    white-space: nowrap
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.5em;
    margin: 0;
`;
export const UserPageDescription = styled.span`
  font-size: 13px;
  text-align: center;
  overflow-wrap: break-word;
  word-break: break-word;
  line-height: 1.5em;
  margin: 0;
  color: rgba(0, 0, 0, 0.6);
  padding-left: 1em;
  padding-right: 1em;
`;

export const UserPageLinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding-left: 0.6em;
  padding-right: 0.6em;
  margin-bottom: 2.5em;
`;

export const UserPageLinkNode = styled.a`
  width: 100%;
  min-height: 62px;
  border: 2px rgba(0, 0, 0, 0.2) solid;
  border-radius: 0.5em;
  padding: 0.5em;
  padding-left: 0.8em;
  padding-right: 0.8em;
  display: flex;
  cursor: pointer;
  gap: 1em;
  text-decoration: none;
  color: black;
  background-color: white !important;
  align-items: center;
  transform: scale(1);
  transition: transform 150ms ease-in-out;

  &:hover {
    transform: scale(1.04);
    transition: transform 150ms ease-in-out;
  }
`;

export const UserPageLinkTitle = styled.p`
  margin: 0;
  width: 100%;
  overflow-wrap: break-word;
  font-size: 14px;
  text-align: center;
  word-break: break-word;
`;
