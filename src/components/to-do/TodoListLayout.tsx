"use client";
import { useQuery } from "convex/react";
import React from "react";
import { api } from "../../../convex/_generated/api";
import TodoList from "./TodoList";
import CompletedTodos from "./CompletedTodos";
import AddTaskWrapper from "../task/AddTaskWrapper";

type Props = {};

const TodoListLayout: React.FC<Props> = ({}) => {
  const completed = useQuery(api.todos.getCompleted, { parentId: null }) ?? [];
  const incomplete =
    useQuery(api.todos.getIncomplete, { parentId: null }) ?? [];
  const totalTodos = useQuery(api.todos.totalTodos) ?? 0;

  if (incomplete === undefined || completed === undefined) {
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
      <AddTaskWrapper />
      <div className="flex flex-col gap-1 py-4">
        <TodoList todos={completed} />
      </div>
      <CompletedTodos totalTodos={totalTodos} />
    </div>
  );
};

export default TodoListLayout;
