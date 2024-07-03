"use client";
import { useQuery } from "convex/react";
import React from "react";
import { api } from "../../../convex/_generated/api";
import TaskItem from "./TaskItem";
import { CircleCheckBig } from "lucide-react";
import TodoList from "./TodoList";
import CompletedTodos from "./CompletedTodos";

type Props = {};

const TodoListLayout: React.FC<Props> = ({}) => {
  const todos = useQuery(api.todos.get, { parentId: undefined }) ?? [];
  const completed = useQuery(api.todos.getCompleted) ?? [];
  const incomplete = useQuery(api.todos.getIncomplete) ?? [];
  const totalTodos = useQuery(api.todos.totalTodos) ?? 0;

  if (
    todos === undefined ||
    incomplete === undefined ||
    completed === undefined
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div className="xl:px-40">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Inbox</h1>
      </div>
      <div className="flex flex-col gap-1 py-4">
        <TodoList todos={incomplete} />
      </div>
      <div className="flex flex-col gap-1 py-4">
        <TodoList todos={completed} />
      </div>
      <CompletedTodos totalTodos={totalTodos} />
    </div>
  );
};

export default TodoListLayout;
