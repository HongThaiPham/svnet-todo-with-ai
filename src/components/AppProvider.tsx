import React, { PropsWithChildren } from "react";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

type Props = {};

const AppProvider: React.FC<PropsWithChildren> = async ({ children }) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <ConvexClientProvider>{children}</ConvexClientProvider>
    </SessionProvider>
  );
};

export default AppProvider;
