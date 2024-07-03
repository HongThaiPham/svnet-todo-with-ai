"use client";
import { useQuery } from "convex/react";
import React from "react";
import { api } from "../../../../convex/_generated/api";
import TodoList from "@/components/to-do/TodoList";
import AddTaskWrapper from "@/components/task/AddTaskWrapper";
import { Dot } from "lucide-react";
import dayjs from "dayjs";

type Props = {};

const TodayPage: React.FC<Props> = ({}) => {
  const overdueTodos = useQuery(api.todos.getOverdueTodos) ?? [];
  const todayTodos = useQuery(api.todos.getTodayTodos) ?? [];

  if (todayTodos === undefined || overdueTodos === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className="xl:px-40">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Today</h1>
      </div>
      <div className="flex flex-col gap-1 py-4">
        <p className="font-bold flex text-sm">Overdue</p>
        <TodoList todos={todayTodos} />
      </div>
      <AddTaskWrapper />
      <div className="flex flex-col gap-1 py-4">
        <p className="font-bold flex text-sm items-center border-b-2 p-2 border-gray-100">
          {dayjs(new Date()).format("LL")}
          <Dot />
          Today
          <Dot />
          {dayjs(new Date()).format("dddd")}
        </p>
        <TodoList todos={overdueTodos} />
      </div>
    </div>
  );
};

export default TodayPage;
