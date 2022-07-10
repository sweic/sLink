import styled from "styled-components";

export {};

export const AdminContainer = styled.div`
  flex: 1 1 770px;
  height: 100%;
  border-right: 0.5px solid rgb(0, 0, 0, 0.2);
  display: block;
`;

export const NavbarContainer = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  height: 56px;
  display: flex;
  align-items: center;
  padding-right: min(2em, 3.5vw);
`;

export const AdminControllerBox = styled.div`
  display: flex;
  height: calc(100% - 56px);
  overflow-y: auto;
  background-color: rgb(0, 0, 0, 0.1);
  justify-content: center;
`;

export const AdminContentBox = styled.div`
  padding-top: 1em;
  padding-left: min(2em, 2vw);
  padding-right: min(2em, 2vw);
  height: max-content;
  flex: 0 1 600px;
`;
