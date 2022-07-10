import { ActionIcon, Group, Image, Popover, TextInput } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { Node } from "@prisma/client";
import { useRef } from "react";
import { Draggable } from "react-beautiful-dnd";
import { flushSync } from "react-dom";
import { GridDots, Link, Pencil, Plus, Trash } from "tabler-icons-react";
import { onRejectUpload } from "utils/displayNotifications";
import {
  LinkNodeContainer,
  LinkNodeContent,
  LinkNodeDragHandle,
  LinkNodeInputs,
  LinkNodeThumbnail,
  LinkNodeThumbnailOverlay,
} from "./Styles";
interface LinkNodeProps {
  node: Node;
  enabled: boolean;
  deleteMode: boolean;
  idx: number;
  popoverOpened: string;
  setPopoverOpened: React.Dispatch<React.SetStateAction<string>>;
  onTitleChange: (idx: number, value: string) => void;
  onLinkChange: (idx: number, value: string) => void;
  onThumbnailChange: (idx: number, value: string) => void;
  onDeleteChange: (idx: number) => void;
}
function LinkNode({
  node,
  enabled,
  deleteMode,
  idx,
  popoverOpened,
  setPopoverOpened,
  onTitleChange,
  onLinkChange,
  onThumbnailChange,
  onDeleteChange,
}: LinkNodeProps) {
  const openUploadRef = useRef<() => void>(() => {});
  return (
    <Draggable
      isDragDisabled={!enabled}
      key={`item-${node.id}`}
      draggableId={`item-${node.id}`}
      index={idx}
    >
      {(provided) => (
        <LinkNodeContainer {...provided.draggableProps} ref={provided.innerRef}>
          <LinkNodeContent>
            <LinkNodeInputs>
              <TextInput
                defaultValue={node.name}
                disabled={!enabled}
                variant="unstyled"
                placeholder="Link Title"
                icon={enabled && <Pencil color="#00000033" size={16} />}
                onChange={(e) => onTitleChange(idx, e.currentTarget.value)}
                styles={{
                  input: { paddingLeft: "1em" },
                  unstyledVariant: { borderRadius: "3em" },
                  disabled: {
                    "&:hover": {
                      cursor: "default",
                    },
                  },
                }}
              />
              <TextInput
                defaultValue={node.link}
                disabled={!enabled}
                variant="unstyled"
                placeholder="URL"
                icon={enabled && <Pencil color="#00000033" size={16} />}
                onChange={(e) => onLinkChange(idx, e.currentTarget.value)}
                styles={{
                  input: { paddingLeft: "1em" },
                  unstyledVariant: { borderRadius: "3em" },
                  disabled: {
                    "&:hover": {
                      cursor: "default",
                    },
                  },
                }}
              />
            </LinkNodeInputs>
            <LinkNodeThumbnail>
              {enabled && (
                <Popover
                  styles={{
                    root: {
                      width: "54px",
                      height: "54px",
                      position: "absolute",
                    },
                    target: {
                      width: "54px",
                      height: "48px",
                    },
                  }}
                  position="bottom"
                  placement="center"
                  radius="xl"
                  closeOnClickOutside
                  withArrow
                  opened={popoverOpened === node.id}
                  onClose={() => setPopoverOpened("")}
                  target={
                    <LinkNodeThumbnailOverlay
                      onClick={() =>
                        setPopoverOpened(
                          popoverOpened === node.id ? "" : node.id
                        )
                      }
                    />
                  }
                >
                  <Group>
                    {node.imageURL && (
                      <ActionIcon radius="xl">
                        <Trash
                          onClick={() => {
                            onThumbnailChange(idx, "");
                            setPopoverOpened("");
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
              {node.imageURL ? (
                <Image width={54} height={54} src={node.imageURL!} />
              ) : (
                <Link color="pink" size={36} />
              )}

              <Dropzone
                accept={IMAGE_MIME_TYPE}
                openRef={openUploadRef}
                onDrop={(files) => {
                  flushSync(() => setPopoverOpened(""));

                  var reader = new FileReader();
                  reader.readAsDataURL(files[0]);
                  reader.onload = () => {
                    onThumbnailChange(idx, reader.result as string);
                  };
                }}
                onReject={() => onRejectUpload()}
                style={{ display: "none" }}
              >
                {(status) => null}
              </Dropzone>
            </LinkNodeThumbnail>
            {enabled && (
              <LinkNodeDragHandle
                {...(!deleteMode && { ...provided.dragHandleProps })}
              >
                {!deleteMode ? (
                  <GridDots size={18} color="#00000033" />
                ) : (
                  <ActionIcon radius="xl">
                    <Trash
                      size={18}
                      color="#00000080"
                      onClick={() => onDeleteChange(idx)}
                    />
                  </ActionIcon>
                )}
              </LinkNodeDragHandle>
            )}
          </LinkNodeContent>
        </LinkNodeContainer>
      )}
    </Draggable>
  );
}

export default LinkNode;
