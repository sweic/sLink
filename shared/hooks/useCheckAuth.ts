import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "shared/state/auth.reducer";
import { useData } from "shared/state/data.reducer";
import { trpc } from "utils/trpcRouter";

interface UseFetchDataProps {
  strict?: boolean;
  redirect?: string;
}
export const useFetchData = (props?: UseFetchDataProps) => {
  const strict = props ? props.strict : true;
  const { redirect } = props || {};
  const { data: session, status } = useSession();
  const { loginUser } = useAuth();
  const router = useRouter();
  const { mutate } = trpc.useMutation("auth.clear");
  const { refetch: refetchData } = trpc.useQuery(
    [
      "data.fetch",
      {
        username: session?.username!,
        version: session?.version!,
      },
    ],
    {
      enabled: false,
      retry: false,
      onSuccess: (data) => {
        updateData(data);
        setLoaded(true);
      },
      onError: (err) => {
        signOut({ callbackUrl: "/" });
        return;
      },
    }
  );
  const { updateData, loaded: dataLoaded } = useData();
  const [loaded, setLoaded] = useState<boolean>(false);
  const fetchDataAsync = async () => {
    await refetchData();
  };
  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      if (!strict) {
        setLoaded(true);
        return;
      }
      mutate();
      signOut({ callbackUrl: "/" });

      return;
    }
    if (session?.error!) {
      signOut({ callbackUrl: "/error" });
      mutate();
      return;
    }
    if (dataLoaded) {
      setLoaded(true);
      return;
    }
    loginUser(session?.username!);
    if (redirect) {
      router.replace(redirect);
      return;
    }

    fetchDataAsync();
  }, [session]);

  return [loaded];
};
