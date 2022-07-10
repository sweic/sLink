import { Button, Stack, Title, Text } from "@mantine/core";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "shared/components/Layout/Layout";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <Layout title="Slink - Link in Bio">
      <Stack
        align="center"
        justify="center"
        style={{ height: "100%", width: "100%" }}
      >
        <Title>sLink!</Title>
        <Text>Link in Bio</Text>
        <Button onClick={() => router.push("/login")}>Get started!</Button>
      </Stack>
    </Layout>
  );
};

export default Home;
