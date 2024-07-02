import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { auth } from "@/auth";

type Props = {};

const UserProfile: React.FC<Props> = async ({}) => {
  const session = await auth();
  if (!session) return null;
  return (
    <div>
      <h1>User Profile</h1>
      <Avatar>
        <AvatarImage
          src={session?.user?.image as string}
          alt="User profile avatar"
          width={24}
          height={24}
        />
        <AvatarFallback>SV</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default UserProfile;
