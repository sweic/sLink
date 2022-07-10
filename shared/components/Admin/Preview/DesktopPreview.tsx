import { Anchor, Text } from "@mantine/core";
import UserPage from "shared/components/User/UserPage";
import { useData } from "shared/state/data.reducer";
import { PreviewContainer, PreviewHeader, UserPageContainer } from "./Styles";

function DesktopPreview() {
  const { previewData } = useData();
  return (
    <PreviewContainer>
      <PreviewHeader>
        <Text>
          My sLink: &nbsp;
          <Anchor
            size="sm"
            underline
            href={`${window.location.origin}/@${previewData.username}`}
            target="_blank"
          >
            {window.location.origin}/@{previewData.username}
          </Anchor>
        </Text>
      </PreviewHeader>
      {previewData.basicInfo !== null && (
        <>
          <UserPageContainer>
            <UserPage data={previewData.basicInfo} />
          </UserPageContainer>
        </>
      )}
    </PreviewContainer>
  );
}

export default DesktopPreview;
