import { ActionIcon, Menu, Tabs } from "@mantine/core";
import { signOut } from "next-auth/react";
import React from "react";
import { Photo, MessageCircle, Settings, Logout } from "tabler-icons-react";
import { NavbarContainer } from "./Styles";
interface NavbarProps {
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}
function Navbar({ setActiveTab }: NavbarProps) {
  return (
    <NavbarContainer>
      <Tabs
        color="dark"
        style={{ height: "100%", width: "100%" }}
        styles={() => ({
          tabControl: {
            paddingTop: ".5em",
            height: "56px",
            marginLeft: "min(2em, 2vw)",
            fontSize: "16px",
          },
        })}
        onTabChange={(val) => setActiveTab(val)}
      >
        <Tabs.Tab label="Links" icon={<Photo size={16} />}></Tabs.Tab>
        <Tabs.Tab label="My Info" icon={<MessageCircle size={16} />}></Tabs.Tab>
      </Tabs>
      <Menu
        control={
          <ActionIcon radius="xl">
            <Settings size={24} />
          </ActionIcon>
        }
      >
        <Menu.Item
          rightSection={<Logout size={24} />}
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Sign Out
        </Menu.Item>
      </Menu>
    </NavbarContainer>
  );
}

export default React.memo(Navbar);
