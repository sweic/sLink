import { Button, Group, Text } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useAuth } from "shared/state/auth.reducer";
import { useData } from "shared/state/data.reducer";
import { trpc } from "utils/trpcRouter";
import LinkNode from "./LinkNode";
import {
  LinkBox,
  LinksButtonGroup,
  LinksContainer,
  PreviewButton,
} from "./Styles";
import { v4 as uuidv4 } from "uuid";
import {
  invalidUpdate,
  onErrorUpdate,
  onSuccessUpdate,
} from "utils/displayNotifications";
import { debounce } from "lodash";
import { isValidURL } from "utils/linkRegex";
import MobilePreview from "../Preview/MobilePreview";
import { getSession, signOut, useSession } from "next-auth/react";
import { Node } from "@prisma/client";
function Links() {
  const { data, updateDataNodes, updatePreviewNodes } = useData();
  const { data: session } = useSession();
  const { user } = useAuth();
  const [currentNodes, setCurrentNodes] = useState<Node[]>([
    ...data.basicInfo!.nodes,
  ]);

  const [enabled, setEnabled] = useState<boolean>(false);
  const [deleteMode, setDeleteMode] = useState<boolean>(false);
  const [previewOpened, setPreviewOpened] = useState<boolean>(false);
  const [popoverOpened, setPopoverOpened] = useState<string>("");
  const saveRef = useRef<Node[]>([...data.basicInfo!.nodes]);
  const { mutate, isLoading } = trpc.useMutation("data.updateNodes", {
    onSuccess: () => {
      onSuccessUpdate();
      updateDataNodes(saveRef.current);
      updatePreviewNodes(saveRef.current);
      setEnabled(false);
    },
    onError: () => {
      onErrorUpdate();
      signOut({ callbackUrl: "/" });
    },
  });

  useEffect(() => {
    return () => {
      updatePreviewNodes(saveRef.current);
    };
  }, []);

  const onTitleChange = debounce((idx: number, value: string) => {
    const newNodeList = currentNodes.map((node, index) => {
      if (index === idx) return { ...currentNodes[idx], name: value };
      return node;
    });
    setCurrentNodes(newNodeList);
    updatePreviewNodes(newNodeList);
  }, 50);
  const onLinkChange = debounce((idx: number, value: string) => {
    const newNodeList = currentNodes.map((node, index) => {
      if (index === idx) return { ...currentNodes[idx], link: value };
      return node;
    });
    setCurrentNodes(newNodeList);
    updatePreviewNodes(newNodeList);
  }, 50);

  const onThumbnailChange = (idx: number, value: string) => {
    const newNodeList = currentNodes.map((node, index) => {
      if (index === idx) return { ...currentNodes[idx], imageURL: value };
      return node;
    });
    setCurrentNodes(newNodeList);
    updatePreviewNodes(newNodeList);
  };
  const onDeleteChange = (idx: number) => {
    const newNodeList = [...currentNodes];
    newNodeList.splice(idx, 1);
    setCurrentNodes(newNodeList);
    updatePreviewNodes(newNodeList);
  };
  return (
    <LinkBox>
      <MobilePreview opened={previewOpened} setOpened={setPreviewOpened} />
      <LinksButtonGroup>
        {enabled ? (
          <>
            <Button
              onClick={() => {
                const newNodeList = [...currentNodes];
                newNodeList.unshift({
                  id: uuidv4(),
                  name: "",
                  link: "http://",
                  imageURL: "",
                });
                setCurrentNodes(newNodeList);
                updatePreviewNodes(newNodeList);
              }}
            >
              Add new Link
            </Button>
            <Button onClick={() => setDeleteMode(!deleteMode)}>
              Toggle Delete
            </Button>
            <PreviewButton>
              <Button onClick={() => setPreviewOpened(true)}>Preview</Button>
            </PreviewButton>
            <Button
              loading={isLoading}
              onClick={async () => {
                for (const node of currentNodes) {
                  if (!isValidURL(node.link)) {
                    invalidUpdate();
                    return;
                  }
                }
                const currentSession = await getSession();
                saveRef.current = currentNodes;
                mutate({
                  username: user,
                  nodes: saveRef.current,
                  version: currentSession?.version!,
                });
              }}
            >
              Save
            </Button>
          </>
        ) : (
          <Button onClick={() => setEnabled(!enabled)}>Edit</Button>
        )}
      </LinksButtonGroup>

      <DragDropContext
        onDragEnd={({ destination, source }) => {
          if (!destination) return;
          if (
            source.index === destination.index &&
            source.droppableId === destination.droppableId
          )
            return;
          const newNodes = currentNodes;
          newNodes[source.index] = newNodes.splice(
            destination.index,
            1,
            newNodes[source.index]
          )[0];
          setCurrentNodes(newNodes);
          updatePreviewNodes(newNodes);
        }}
      >
        <Droppable droppableId={"test"} isDropDisabled={!enabled}>
          {(provided) => (
            <LinksContainer
              ref={provided.innerRef}
              {...provided.droppableProps}
              id="links-container"
            >
              {currentNodes.map((node, idx) => {
                return (
                  <LinkNode
                    key={node.id}
                    node={node}
                    enabled={enabled && !isLoading}
                    deleteMode={deleteMode}
                    idx={idx}
                    popoverOpened={popoverOpened}
                    setPopoverOpened={setPopoverOpened}
                    onTitleChange={onTitleChange}
                    onLinkChange={onLinkChange}
                    onThumbnailChange={onThumbnailChange}
                    onDeleteChange={onDeleteChange}
                  />
                );
              })}
              {provided.placeholder}
            </LinksContainer>
          )}
        </Droppable>
      </DragDropContext>
    </LinkBox>
  );
}

export default Links;
