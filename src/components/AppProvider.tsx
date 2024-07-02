import React, { PropsWithChildren } from "react";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { auth } from "@/auth";
import AuthSessionProvider from "./AuthSessionProvider";

type Props = {};

const AppProvider: React.FC<PropsWithChildren> = async ({ children }) => {
  const session = await auth();
  return (
    <AuthSessionProvider session={session}>
      <ConvexClientProvider>{children}</ConvexClientProvider>
    </AuthSessionProvider>
  );
};

export default AppProvider;
