import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { auth } from "@/auth";

type Props = {};

const UserProfile: React.FC<Props> = async ({}) => {
  const session = await auth();
  if (!session) return null;
  return (
    <div>
      <Avatar className="w-8 h-8">
        <AvatarImage
          src={session?.user?.image as string}
          alt="User profile avatar"
          width={32}
          height={32}
        />
        <AvatarFallback>SV</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default UserProfile;
