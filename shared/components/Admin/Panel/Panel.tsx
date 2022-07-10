import { useState } from "react";
import { trpc } from "utils/trpcRouter";
import Links from "../Links/Links";
import Profile from "../Profile/Profile";
import Navbar from "./Navbar";
import { AdminContainer, AdminContentBox, AdminControllerBox } from "./Styles";

function Panel() {
  const [activeTab, setActiveTab] = useState<number>(0);
  return (
    <AdminContainer>
      <Navbar setActiveTab={setActiveTab} />
      <AdminControllerBox>
        <AdminContentBox>
          {activeTab === 0 ? (
            <Links />
          ) : activeTab === 1 ? (
            <Profile />
          ) : (
            <div>sda</div>
          )}
        </AdminContentBox>
      </AdminControllerBox>
    </AdminContainer>
  );
}

export default Panel;
