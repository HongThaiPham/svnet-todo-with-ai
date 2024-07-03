"use client";
import { useQuery } from "convex/react";
import React from "react";
import { api } from "../../../../convex/_generated/api";
import TodoList from "@/components/to-do/TodoList";
import AddTaskWrapper from "@/components/task/AddTaskWrapper";
import dayjs from "dayjs";
import { Dot } from "lucide-react";

type Props = {};

const UpcomingPage: React.FC<Props> = ({}) => {
  const groupTodosByDate = useQuery(api.todos.getTodosGroupByDate) ?? [];
  const overdueTodos = useQuery(api.todos.getOverdueTodos) ?? [];

  if (groupTodosByDate === undefined || overdueTodos === undefined) {
    <p>Loading...</p>;
  }
  return (
    <div className="xl:px-40">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Upcoming</h1>
      </div>
      <div className="flex flex-col gap-1 py-4">
        <p className="font-bold flex text-sm">Overdue</p>
        <TodoList todos={overdueTodos} />
      </div>
      <div className="pb-6">
        <AddTaskWrapper />
      </div>
      <div className="flex flex-col gap-1 py-4">
        {Object.keys(groupTodosByDate || {}).map((dueDate) => {
          return (
            <div key={dueDate} className="mb-6">
              <p className="font-bold flex text-sm items-center">
                {dayjs(dueDate).format("LL")} <Dot />
                {dayjs(dueDate).format("dddd")}
              </p>
              <ul>
                <TodoList todos={groupTodosByDate[dueDate]} />
                <div className="pt-6">
                  <AddTaskWrapper />
                </div>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingPage;
