import { Anchor, Stack, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { useState } from "react";
import LoginForm from "shared/components/Auth/LoginForm";
import RegisterForm from "shared/components/Auth/RegisterForm";
import Layout from "shared/components/Layout/Layout";
import Loading from "shared/components/Loading/Loading";
import { useFetchData } from "shared/hooks/useCheckAuth";

function Auth() {
  const [authMode, setAuthMode] = useState<0 | 1>(0);
  const [loaded] = useFetchData({ redirect: "/admin", strict: false });

  return (
    <Layout title={authMode === 0 ? "Slink - Register" : "Slink - Login"}>
      {loaded ? (
        <Stack
          align="center"
          justify="center"
          style={{ height: "100%", width: "100%" }}
        >
          {authMode === 0 ? <RegisterForm /> : <LoginForm />}
          <Text>
            {authMode === 0 ? (
              <Text>
                Have an account?{" "}
                <Anchor onClick={() => setAuthMode(1)}>Login in here</Anchor>
              </Text>
            ) : (
              <Text>
                Don&apos;t have an account?
                <Anchor onClick={() => setAuthMode(0)}> Sign up now! </Anchor>
              </Text>
            )}
          </Text>
        </Stack>
      ) : (
        <Loading />
      )}
    </Layout>
  );
}

export default Auth;
