"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { Id } from "../../../convex/_generated/dataModel";
import { useToast } from "../ui/use-toast";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { EllipsisIcon, Trash2 } from "lucide-react";

type Props = {
  projectId: Id<"projects">;
};

const DeleteProject: React.FC<Props> = ({ projectId }) => {
  const form = useForm({ defaultValues: { name: "" } });
  const { toast } = useToast();
  const router = useRouter();
  const deleteProject = useAction(api.projects.deleteProjectAndItsTasks);
  const onSubmit = async () => {
    if (projectId === process.env.NEXT_PUBLIC_GET_STARTED_PROJECT_ID) {
      toast({
        title: "🤗 Just a reminder",
        description: "System projects are protected from deletion.",
        duration: 3000,
      });
    } else {
      const deleteTaskId = await deleteProject({ projectId });

      if (deleteTaskId !== undefined) {
        toast({
          title: "🗑️ Project deleted",
          duration: 3000,
        });
        router.push(`/my-board/projects`);
      }
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisIcon className="w-5 h-5 text-foreground hover:cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <button type="submit" className="flex gap-2 text-red-500">
              <Trash2 className="w-5 h-5 rotate-45 text-red-500" /> Delete
              Project
            </button>
          </form>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DeleteProject;
