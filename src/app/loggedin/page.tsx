import UserProfile from "@/components/UserProfile";
import React from "react";

type Props = {};

const LoggedInPage: React.FC<Props> = ({}) => {
  return (
    <div>
      <h1>Logged In</h1>
      <UserProfile />
    </div>
  );
};

export default LoggedInPage;
