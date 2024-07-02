import React, { PropsWithChildren } from "react";
import { ConvexClientProvider } from "./ConvexClientProvider";

type Props = {};

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <ConvexClientProvider>{children}</ConvexClientProvider>;
};

export default AppProvider;
