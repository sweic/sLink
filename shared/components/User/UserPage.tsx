import { Avatar, Image } from "@mantine/core";
import { BasicInfo } from "@prisma/client";
import { UserCircle } from "tabler-icons-react";
import { isValidURL } from "utils/linkRegex";
import {
  UserPageContainer,
  UserPageContent,
  UserPageDescription,
  UserPageInfoContainer,
  UserPageInfoDetails,
  UserPageLinkNode,
  UserPageLinksContainer,
  UserPageLinkTitle,
  UserPageTitle,
} from "./Styles";

function UserPage({ data }: { data: BasicInfo }) {
  return (
    <>
      <UserPageContainer>
        {data && (
          <UserPageContent>
            <UserPageInfoContainer>
              {data?.imageURL ? (
                <Image
                  style={{ alignSelf: "center" }}
                  radius="xl"
                  width={96}
                  height={96}
                  src={data?.imageURL}
                />
              ) : (
                <Avatar radius="xl" size={96} style={{ alignSelf: "center" }}>
                  <UserCircle size={54} />
                </Avatar>
              )}
              <UserPageInfoDetails>
                <UserPageTitle>{data.title}</UserPageTitle>
                <UserPageDescription>{data.description}</UserPageDescription>
              </UserPageInfoDetails>
              <UserPageLinksContainer>
                {data.nodes.map((node) => {
                  if (!node.link || !node.name || !isValidURL(node.link))
                    return;
                  return (
                    <UserPageLinkNode
                      key={node.id}
                      href={node.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {node.imageURL && (
                        <Image
                          style={{ alignSelf: "center" }}
                          width={54}
                          height={54}
                          src={node?.imageURL}
                        />
                      )}
                      <UserPageLinkTitle>{node.name}</UserPageLinkTitle>
                    </UserPageLinkNode>
                  );
                })}
              </UserPageLinksContainer>
            </UserPageInfoContainer>
          </UserPageContent>
        )}
      </UserPageContainer>
    </>
  );
}

export default UserPage;
