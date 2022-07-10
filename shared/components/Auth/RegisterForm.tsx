import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "shared/state/auth.reducer";
import { At, Lock, User } from "tabler-icons-react";
import { trpc } from "utils/trpcRouter";
import { AuthContainer } from "./Styles";

function RegisterForm() {
  const { mutate } = trpc.useMutation("auth.registerUser");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { loginUser } = useAuth();
  const router = useRouter();
  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      username: (val) =>
        val.length > 5 ? null : "Username must have at least 6 characters.",
      email: (val) =>
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)
          ? null
          : "Invalid email",
      password: (val) =>
        val.length > 7 ? null : "Password must have at least 8 characters",
      confirmPassword: (val, formVal) =>
        val === formVal.password ? null : "Passwords do not match",
    },
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    mutate(
      {
        username: form.values.username,
        password: form.values.password,
        email: form.values.email,
      },

      {
        onSuccess: (data) => {
          loginUser(data);
          signIn("credentials", {
            username: form.values.username,
            password: form.values.password,
            redirect: false,
            callbackUrl: "/admin",
          });
        },
        onError: (err) => {
          if (err.message === "Username")
            form.setFieldError("username", "This username is taken!");
          else if (err.message === "Email")
            form.setFieldError("email", "This email is taken!");
          setIsLoading(false);
        },
      }
    );
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
          placeholder="Email Address"
          label="Email"
          icon={<At size={"16"} />}
          {...form.getInputProps("email")}
        />
        <TextInput
          placeholder="Password"
          label="Password"
          icon={<Lock size={"16"} />}
          type="password"
          {...form.getInputProps("password")}
        />
        <TextInput
          placeholder="Confirm Password"
          label="Confirm Password"
          icon={<Lock size={"16"} />}
          type="password"
          {...form.getInputProps("confirmPassword")}
        />
        <Button type="submit" loading={isLoading}>
          Submit
        </Button>
      </AuthContainer>
    </form>
  );
}

export default RegisterForm;
