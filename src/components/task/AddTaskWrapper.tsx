"use client";
import React from "react";
import AddTaskButton from "./AddTaskButton";
import AddTaskInline from "./AddTaskInline";
import { Doc } from "../../../convex/_generated/dataModel";

type Props = {
  parentTask?: Doc<"todos">;
};

const AddTaskWrapper: React.FC<Props> = ({}) => {
  const [showAddTask, setShowAddTask] = React.useState(false);
  return showAddTask ? (
    <AddTaskInline onCancel={() => setShowAddTask(false)} />
  ) : (
    <AddTaskButton onClick={() => setShowAddTask(!showAddTask)} />
  );
};

export default AddTaskWrapper;
