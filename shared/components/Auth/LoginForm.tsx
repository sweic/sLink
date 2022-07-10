import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "shared/state/auth.reducer";
import { Lock, User } from "tabler-icons-react";
import { AuthContainer } from "./Styles";

function LoginForm() {
  const { loginUser } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: (val) =>
        val.length > 5 ? null : "Username must have at least 6 characters.",
      password: (val) =>
        val.length > 7 ? null : "Password must have at least 8 characters",
    },
  });
  const handleSubmit = async () => {
    const user = form.values.username;
    const res = await signIn("credentials", {
      username: form.values.username,
      password: form.values.password,
      redirect: false,
    });
    if (res!.ok) {
      router.push("/admin");
      loginUser(user);
      return;
    }
    setIsLoading(false);
    form.setFieldError("username", "Username or password is invalid");
  };
  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <AuthContainer>
        <TextInput
          icon={<User size={"16"} />}
          placeholder="Username"
          label="Username"
          {...form.getInputProps("username")}
        />
        <TextInput
          placeholder="Password"
          label="Password"
          icon={<Lock size={"16"} />}
          type="password"
          {...form.getInputProps("password")}
        />
        <Button
          type="submit"
          loading={isLoading}
          onClick={async () => {
            setIsLoading(true);
            await handleSubmit();
          }}
        >
          Login
        </Button>
      </AuthContainer>
    </form>
  );
}

export default LoginForm;
