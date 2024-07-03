"use client";
import React from "react";
import { Doc } from "../../../convex/_generated/dataModel";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";

type Props = {
  todo: Doc<"todos">;
  onChange: (id: Doc<"todos">) => void;
};

const TaskItem: React.FC<Props> = ({ todo, onChange }) => {
  return (
    <div key={todo._id} className="flex items-center space-x-2">
      <Checkbox
        id={todo._id}
        className={cn(
          "w-5 h-5 rounded-xl",
          todo.isCompleted && "data-[state=checked]:bg-gray-300 border-gray-300"
        )}
        checked={todo.isCompleted}
        onCheckedChange={() => onChange(todo)}
      />
      <label
        htmlFor={todo._id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {todo.taskName}
      </label>
    </div>
  );
};

export default TaskItem;
