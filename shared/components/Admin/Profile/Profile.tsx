import {
  ActionIcon,
  Avatar,
  Button,
  Group,
  Image,
  Popover,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { getSession, signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useAuth } from "shared/state/auth.reducer";
import { useData, UserInfo } from "shared/state/data.reducer";
import { Plus, Trash, UserCircle } from "tabler-icons-react";
import {
  onErrorUpdate,
  onRejectUpload,
  onSuccessUpdate,
} from "utils/displayNotifications";
import { trpc } from "utils/trpcRouter";
import { LinksButtonGroup, PreviewButton } from "../Links/Styles";
import MobilePreview from "../Preview/MobilePreview";
import {
  ProfileBox,
  ProfileEditContainer,
  ProfileInfoContainer,
  ProfileInfoInput,
  ProfileThumbnailContainer,
  ProfileThumbnailOverlay,
} from "./Styles";

function Profile() {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [popoverOpened, setPopoverOpened] = useState<boolean>(false);
  const [previewOpened, setPreviewOpened] = useState<boolean>(false);
  const { data, updatePreviewInfo, updateDataInfo } = useData();
  const [currentBasicInfo, setCurrentBasicInfo] = useState<UserInfo>({
    title: data.basicInfo?.title!,
    description: data.basicInfo?.description!,
    imageURL: data.basicInfo?.imageURL!,
  });
  const saveRef = useRef<UserInfo>(currentBasicInfo);
  const { user } = useAuth();
  const openUploadRef = useRef<() => void>(() => {});
  const { mutate, isLoading } = trpc.useMutation("data.updateInfo", {
    onSuccess: () => {
      onSuccessUpdate();
      updateDataInfo(saveRef.current);
      setEnabled(false);
    },
    onError: () => {
      onErrorUpdate();
      signOut({ callbackUrl: "/" });
    },
  });
  useEffect(() => {
    return () => {
      updatePreviewInfo(saveRef.current);
    };
  }, []);

  const onTitleChange = (value: string) => {
    if (value.length > 30) return;
    const newInfo = {
      ...currentBasicInfo,
      title: value,
    };
    updatePreviewInfo(newInfo);
    setCurrentBasicInfo(newInfo);
  };
  const onDescriptionChange = (value: string) => {
    if (value.length > 80) return;

    const newInfo = {
      ...currentBasicInfo,
      description: value,
    };
    updatePreviewInfo(newInfo);
    setCurrentBasicInfo(newInfo);
  };

  const onThumbnailChange = (value: string) => {
    const newInfo = {
      ...currentBasicInfo,
      imageURL: value,
    };
    updatePreviewInfo(newInfo);
    setCurrentBasicInfo(newInfo);
  };
  return (
    <ProfileBox>
      <MobilePreview opened={previewOpened} setOpened={setPreviewOpened} />
      <LinksButtonGroup>
        <Button
          loading={isLoading}
          onClick={async () => {
            if (!enabled) {
              setEnabled(true);
              return;
            }
            const currentSession = await getSession();
            saveRef.current = currentBasicInfo;
            mutate({
              ...saveRef.current,
              username: user,
              version: currentSession?.version!,
            });
          }}
        >
          {enabled ? "Save" : "Edit"}
        </Button>
        <PreviewButton>
          <Button onClick={() => setPreviewOpened(true)}>Preview</Button>
        </PreviewButton>
      </LinksButtonGroup>
      <ProfileEditContainer>
        <ProfileThumbnailContainer>
          {enabled && (
            <Popover
              styles={{
                root: {
                  width: "96px",
                  height: "96px",
                  position: "absolute",
                },
                target: {
                  width: "96px",
                  height: "88px",
                },
              }}
              position="bottom"
              placement="center"
              radius="xl"
              closeOnClickOutside
              withArrow
              opened={popoverOpened}
              onClose={() => setPopoverOpened(false)}
              target={
                <ProfileThumbnailOverlay
                  onClick={() => setPopoverOpened(true)}
                />
              }
            >
              <Group>
                {data!.basicInfo?.imageURL && (
                  <ActionIcon radius="xl">
                    <Trash
                      onClick={() => {
                        onThumbnailChange("");
                        setPopoverOpened(false);
                      }}
                    />
                  </ActionIcon>
                )}
                <ActionIcon radius="xl">
                  <Plus onClick={() => openUploadRef.current()} />
                </ActionIcon>
              </Group>
            </Popover>
          )}
          {currentBasicInfo.imageURL ? (
            <Image
              width={96}
              height={96}
              radius="xl"
              src={currentBasicInfo.imageURL!}
            />
          ) : (
            <Avatar radius="xl" size={96} style={{ alignSelf: "center" }}>
              <UserCircle size={54} />
            </Avatar>
          )}
          <Dropzone
            accept={IMAGE_MIME_TYPE}
            openRef={openUploadRef}
            onDrop={(files) => {
              flushSync(() => setPopoverOpened(false));
              var reader = new FileReader();
              reader.readAsDataURL(files[0]);
              reader.onload = () => {
                onThumbnailChange(reader.result as string);
              };
            }}
            onReject={() => onRejectUpload()}
            style={{ display: "none" }}
          >
            {(status) => null}
          </Dropzone>
        </ProfileThumbnailContainer>
        <ProfileInfoContainer>
          <ProfileInfoInput>
            <TextInput
              defaultValue={currentBasicInfo.title!}
              value={currentBasicInfo.title!}
              description="Profile Title"
              disabled={!enabled}
              onChange={(e) => onTitleChange(e.currentTarget.value)}
            />
            <Text style={{ alignSelf: "end" }} size="xs">
              {`${currentBasicInfo.title!.length}/30`}
            </Text>
          </ProfileInfoInput>
          <ProfileInfoInput>
            <Textarea
              description="Bio"
              disabled={!enabled}
              minRows={3}
              maxRows={3}
              defaultValue={currentBasicInfo.description!}
              value={currentBasicInfo.description!}
              onChange={(e) => onDescriptionChange(e.currentTarget.value)}
            />
            <Text style={{ alignSelf: "end" }} size="xs">
              {`${currentBasicInfo.description!.length}/80`}
            </Text>
          </ProfileInfoInput>
        </ProfileInfoContainer>
      </ProfileEditContainer>
    </ProfileBox>
  );
}

export default Profile;
