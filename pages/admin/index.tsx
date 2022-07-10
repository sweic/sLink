import { NextPageWithLayout } from "pages/_app";
import Panel from "shared/components/Admin/Panel/Panel";
import DesktopPreview from "shared/components/Admin/Preview/DesktopPreview";
import Layout from "shared/components/Layout/Layout";
import Loading from "shared/components/Loading/Loading";
import { useFetchData } from "shared/hooks/useCheckAuth";
import { useAuth } from "shared/state/auth.reducer";
import styled from "styled-components";

const Admin: NextPageWithLayout = () => {
  const { user } = useAuth();
  const [loaded] = useFetchData();

  return (
    <Layout title={loaded ? `Admin - ${user}` : "Loading..."}>
      <AdminLayout>
        {loaded ? (
          <>
            <Panel />
            <DesktopPreview />
          </>
        ) : (
          <Loading />
        )}
      </AdminLayout>
    </Layout>
  );
};
export default Admin;

const AdminLayout = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;
