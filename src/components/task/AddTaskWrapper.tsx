"use client";
import React from "react";
import AddTaskButton from "./AddTaskButton";
import AddTaskInline from "./AddTaskInline";
import { Doc, Id } from "../../../convex/_generated/dataModel";

type Props = {
  parentTask?: Doc<"todos">;
  projectId?: Id<"projects">;
};

const AddTaskWrapper: React.FC<Props> = ({ parentTask, projectId }) => {
  const [showAddTask, setShowAddTask] = React.useState(false);
  return showAddTask ? (
    <AddTaskInline
      onCancel={() => setShowAddTask(false)}
      parentTask={parentTask}
      projectId={projectId}
    />
  ) : (
    <AddTaskButton
      onClick={() => setShowAddTask(!showAddTask)}
      title={parentTask?._id ? "Add sub-task" : "Add task"}
    />
  );
};

export default AddTaskWrapper;
