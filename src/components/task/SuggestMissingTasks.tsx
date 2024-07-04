"use client";
import React, { useState } from "react";
import { Id } from "../../../convex/_generated/dataModel";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";

type Props = {
  projectId: Id<"projects">;
  isSubTask?: boolean;
  taskName?: string;
  description?: string;
  parentId?: Id<"todos">;
};

const SuggestMissingTasks: React.FC<Props> = ({
  projectId,
  isSubTask,
  taskName,
  description,
  parentId,
}) => {
  const [isLoadingSuggestMissingTasks, setIsLoadingSuggestMissingTasks] =
    useState(false);

  const suggestMissingTasks =
    useAction(api.openai.suggestMissingItemsWithAi) || [];

  const suggestMissingSubTasks =
    useAction(api.openai.suggestMissingSubItemsWithAi) || [];

  const handleMissingTasks = async () => {
    setIsLoadingSuggestMissingTasks(true);
    try {
      await suggestMissingTasks({ projectId });
    } catch (error) {
      console.log("Error in suggestMissingTasks", error);
    } finally {
      setIsLoadingSuggestMissingTasks(false);
    }
  };

  const handleMissingSubTasks = async () => {
    setIsLoadingSuggestMissingTasks(true);
    try {
      if (parentId) {
        await suggestMissingSubTasks({
          projectId,
          taskName: taskName || "",
          description: description || "",
          parentId,
        });
      }
    } catch (error) {
      console.log("Error in suggestMissingSubTasks", error);
    } finally {
      setIsLoadingSuggestMissingTasks(false);
    }
  };
  return (
    <>
      <Button
        variant={"outline"}
        disabled={isLoadingSuggestMissingTasks}
        onClick={isSubTask ? handleMissingSubTasks : handleMissingTasks}
      >
        {isLoadingSuggestMissingTasks ? (
          <div className="flex gap-2">
            Loading Tasks (AI)
            <Loader className="h-5 w-5 text-primary animate-spin" />
          </div>
        ) : (
          "Suggest Missing Tasks (AI) 💖"
        )}
      </Button>
    </>
  );
};

export default SuggestMissingTasks;
