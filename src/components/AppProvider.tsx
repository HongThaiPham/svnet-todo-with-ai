import React, { PropsWithChildren } from "react";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "./ui/toaster";

type Props = {};

const AppProvider: React.FC<PropsWithChildren> = async ({ children }) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <ConvexClientProvider>
        {children}
        <Toaster />
      </ConvexClientProvider>
    </SessionProvider>
  );
};

export default AppProvider;
