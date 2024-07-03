"use client";
import React from "react";
import { Button } from "../ui/button";

import { Doc, Id } from "../../../convex/_generated/dataModel";
import AddTaskForm from "./AddTaskForm";

type Props = {
  onCancel: () => void;
  parentTask?: Doc<"todos">;
  projectId?: Id<"projects">;
};

const AddTaskInline: React.FC<Props> = ({
  onCancel,
  projectId: myProjectId,
  parentTask,
}) => {
  const projectId =
    myProjectId ||
    parentTask?.projectId ||
    (process.env.NEXT_PUBLIC_GET_STARTED_PROJECT_ID as Id<"projects">);

  const labelId =
    parentTask?.labelId ||
    (process.env.NEXT_PUBLIC_GET_STARTED_LABEL_ID as Id<"labels">);

  const priority = parentTask?.priority?.toString() || "1";
  const parentId = parentTask?._id || null;

  return (
    <div>
      <AddTaskForm
        projectId={projectId}
        labelId={labelId}
        priority={priority}
        parentId={parentId}
        onCancel={onCancel}
      />
    </div>
  );
};

export default AddTaskInline;
