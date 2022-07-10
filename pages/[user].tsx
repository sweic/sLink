import { BasicInfo } from "@prisma/client";
import { GetServerSidePropsContext, GetStaticPropsContext } from "next";
import Layout from "shared/components/Layout/Layout";
import UserPage from "shared/components/User/UserPage";
import { prisma } from "shared/db/client";
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const user = context.params?.user;
  if (typeof user !== "string") return;
  const info = await prisma.basicInfo.findUnique({
    where: {
      username: user.substring(1),
    },
  });
  return {
    props: {
      user,
      data: info,
    },
  };
};

interface UserPageProps {
  user: string;
  data: BasicInfo | null;
}
function User({ user, data }: UserPageProps) {
  if (data === null && typeof window !== "undefined") {
    window.location.href = "/";
    return <></>;
  }
  return (
    <Layout title={`sLink - ${user}`}>
      {data !== null ? <UserPage data={data} /> : <></>}
    </Layout>
  );
}

export default User;
