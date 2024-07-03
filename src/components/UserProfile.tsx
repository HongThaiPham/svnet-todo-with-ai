"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSession } from "next-auth/react";

type Props = {};

const UserProfile: React.FC<Props> = ({}) => {
  const session = useSession();
  if (!session) return null;
  return (
    <div className="flex items-center gap-2">
      <Avatar className="w-8 h-8">
        <AvatarImage
          src={session.data?.user?.image as string}
          alt="User profile avatar"
          width={32}
          height={32}
        />
        <AvatarFallback>SV</AvatarFallback>
      </Avatar>
      <span className="text-sm text-primary font-semibold">
        {session.data?.user?.name}
      </span>
    </div>
  );
};

export default UserProfile;
