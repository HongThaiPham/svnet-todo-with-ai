import { Session } from "next-auth";
import React, { PropsWithChildren } from "react";

type Props = {
  session: Session | null;
} & PropsWithChildren;

const AuthSessionProvider: React.FC<Props> = ({ children }) => {
  return <div></div>;
};

export default AuthSessionProvider;
