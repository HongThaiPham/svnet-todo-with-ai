"use client";
import React, { useEffect, useState } from "react";
import localizedFormat from "dayjs/plugin/localizedFormat";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Doc } from "../../../convex/_generated/dataModel";
import { Calendar, ChevronDown, Flag, Hash, Tag } from "lucide-react";
import AddTaskWrapper from "../task/AddTaskWrapper";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import dayjs from "dayjs";
import { Label } from "../ui/label";
import TodoList from "./TodoList";
dayjs.extend(localizedFormat);
type Props = {
  todo: Doc<"todos">;
};

const TaskDialog: React.FC<Props> = ({ todo }) => {
  const project = useQuery(api.projects.getById, { id: todo.projectId });
  const label = useQuery(api.labels.getById, { id: todo.labelId });

  const subTaskCompleted =
    useQuery(api.todos.getCompleted, { parentId: todo._id }) ?? [];
  const subTaskIncompleted =
    useQuery(api.todos.getIncomplete, { parentId: todo._id }) ?? [];

  const [todoDetails, setTodoDetails] = useState<
    Array<{ labelName: string; value: string; icon: React.ReactNode }>
  >([]);

  useEffect(() => {
    const data = [
      {
        labelName: "Project",
        value: project?.name || "",
        icon: <Hash className="w-4 h-4 text-primary capitalize" />,
      },
      {
        labelName: "Due date",
        value: dayjs(todo.dueDate || new Date()).format("LL"),
        icon: <Calendar className="w-4 h-4 text-primary capitalize" />,
      },
      {
        labelName: "Priority",
        value: todo.priority?.toString() || "",
        icon: <Flag className="w-4 h-4 text-primary capitalize" />,
      },
      {
        labelName: "Label",
        value: label?.name || "",
        icon: <Tag className="w-4 h-4 text-primary capitalize" />,
      },
    ];
    if (data) {
      setTodoDetails(data);
    }
  }, [label?.name, project, todo.dueDate, todo.priority]);

  return (
    <DialogContent className="max-w-4xl lg:h-4/6 flex flex-col md:flex-row lg:justify-between text-right">
      <DialogHeader className="w-full">
        <DialogTitle>{todo.taskName}</DialogTitle>
        <DialogDescription>
          <span className="my-2 capitalize">{todo.description}</span>
          <div className="flex items-center gap-1 mt-12 border-b-2 border-gray-100 pb-2 flex-wrap sm:justify-between lg:gap-0 ">
            <div className="flex gap-1">
              <ChevronDown className="w-5 h-5 text-primary" />
              <p className="font-bold flex text-sm text-gray-900">Sub-tasks</p>
            </div>
          </div>
          <div className="pl-4">
            <TodoList todos={subTaskIncompleted} />
            <div className="py-4">
              <AddTaskWrapper parentTask={todo} />
            </div>

            <TodoList todos={subTaskCompleted} />
          </div>
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-2 bg-gray-100 lg:w-1/2">
        {todoDetails.map(({ labelName, value, icon }, idx) => (
          <div
            key={`${value}-${idx}`}
            className="grid gap-2 p-4 border-b-2 w-full"
          >
            <Label className="flex items-start">{labelName}</Label>
            <div className="flex text-left items-center justify-start gap-2 pb-2">
              {icon}
              <p className="text-sm">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </DialogContent>
  );
};

export default TaskDialog;
