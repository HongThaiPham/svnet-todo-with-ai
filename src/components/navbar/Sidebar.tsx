"use client";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { Bell, Hash, PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import UserProfile from "../UserProfile";
import { primaryNavItems } from "@/lib/menu-items";
import { usePathname } from "next/navigation";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { cn } from "@/lib/utils";
import { Doc } from "../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import AddProjectDialog from "../project/AddProjectDialog";
import AddLabelDialog from "../task/AddLabelDialog";
type Props = {};
interface MyListTitleType {
  [key: string]: string;
}

const Sidebar: React.FC<Props> = ({}) => {
  const projectList = useQuery(api.projects.get);
  const LIST_OF_TITLE_IDS: MyListTitleType = {
    primary: "",
    projects: "My Projects",
  };
  const pathname = usePathname();
  const renderItems = useMemo(() => {
    if (projectList)
      return [
        ...primaryNavItems,
        ...projectList.map(({ _id, name }, idx) => {
          return {
            ...(idx === 0 && { id: "projects" }),
            name,
            link: `/my-board/projects/${_id.toString()}`,
            icon: <Hash className="w-4 h-4" />,
          };
        }),
      ];
    return primaryNavItems;
  }, [projectList]);

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <UserProfile />
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {renderItems.map(({ name, icon, link, id }, idx) => (
              <div key={idx}>
                {id && (
                  <div
                    className={cn(
                      "flex items-center mt-6 mb-2",
                      id === "filters" && "my-0"
                    )}
                  >
                    <p className="flex flex-1 text-base">
                      {LIST_OF_TITLE_IDS[id]}
                    </p>
                    {LIST_OF_TITLE_IDS[id] === "My Projects" && (
                      <AddProjectDialog />
                    )}
                  </div>
                )}
                <div className={cn("flex items-center lg:w-full")}>
                  <div
                    className={cn(
                      "flex items-center text-left lg:gap-3 rounded-lg py-2 transition-all hover:text-primary justify-between w-full",
                      pathname === link
                        ? "active rounded-lg bg-primary/10 text-primary transition-all hover:text-primary"
                        : "text-foreground "
                    )}
                  >
                    <Link
                      key={idx}
                      href={link}
                      className={cn(
                        "flex items-center text-left gap-3 rounded-lg transition-all hover:text-primary w-full"
                      )}
                    >
                      <div className="flex gap-4 items-center w-full">
                        <div className="flex gap-2 items-center">
                          <p className="flex text-base text-left">
                            {icon || <Hash />}
                          </p>
                          <p>{name}</p>
                        </div>
                      </div>
                    </Link>
                    {id === "filters" && <AddLabelDialog />}
                  </div>
                </div>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
