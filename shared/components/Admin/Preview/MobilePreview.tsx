import React from "react";
import ReactDOM from "react-dom";
import UserPage from "shared/components/User/UserPage";
import { useData } from "shared/state/data.reducer";
import { X } from "tabler-icons-react";
import {
  MobilePreviewContainer,
  PreviewCloseBox,
  PreviewModal,
} from "./Styles";
interface MobilePreviewProps {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}
function MobilePreview({ opened, setOpened }: MobilePreviewProps) {
  const { previewData } = useData();
  const root = document.getElementById("__next");

  return (
    <>
      {ReactDOM.createPortal(
        <PreviewModal opened={opened}>
          <PreviewCloseBox>
            <X size={16} onClick={() => setOpened(false)} />
          </PreviewCloseBox>
          <MobilePreviewContainer>
            <UserPage data={previewData.basicInfo!} />
          </MobilePreviewContainer>
        </PreviewModal>,
        root!
      )}
    </>
  );
}

export default React.memo(MobilePreview);
