"use client";
import React from "react";
import { Doc } from "../../../convex/_generated/dataModel";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Calendar, GitBranch } from "lucide-react";
import dayjs from "dayjs";

type Props = {
  todo: Doc<"todos">;
  onChange: (id: Doc<"todos">) => void;
  showDetails?: boolean;
};

const TaskItem: React.FC<Props> = ({ todo, onChange, showDetails }) => {
  return (
    <div className="flex items-center space-x-2 border-b-2 p-2 border-gray-100 animate-in fade-in">
      <Dialog>
        <div className="flex gap-2 items-center justify-end w-full">
          <div className="flex gap-2 w-full">
            <Checkbox
              id={todo._id}
              className={cn(
                "w-5 h-5 rounded-xl",
                todo.isCompleted &&
                  "data-[state=checked]:bg-gray-300 border-gray-300"
              )}
              checked={todo.isCompleted}
              onCheckedChange={() => onChange(todo)}
            />
            <DialogTrigger asChild>
              <div className="flex flex-col items-start">
                <button
                  className={cn(
                    "text-sm font-normal text-left",
                    todo.isCompleted && "line-through text-foreground/30"
                  )}
                >
                  {todo.taskName}
                </button>
                {showDetails && (
                  <div className="flex gap-2">
                    <div className="flex items-center justify-center gap-1">
                      <GitBranch className="w-3 h-3 text-foreground/70" />
                      <p className="text-xs text-foreground/70"></p>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Calendar className="w-3 h-3 text-primary" />
                      <p className="text-xs text-primary">
                        {dayjs(todo.dueDate).format("LL")}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </DialogTrigger>
          </div>
        </div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* <div key={todo._id} className="flex items-center space-x-2">
        <Checkbox
          id={todo._id}
          className={cn(
            "w-5 h-5 rounded-xl",
            todo.isCompleted &&
              "data-[state=checked]:bg-gray-300 border-gray-300"
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
      </div> */}
    </div>
  );
};

export default TaskItem;
