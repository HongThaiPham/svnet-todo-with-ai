"use client";
import React from "react";
import { Doc } from "../../../convex/_generated/dataModel";
import TaskItem from "./TaskItem";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useToast } from "../ui/use-toast";

type Props = {
  todos: Array<Doc<"todos">>;
};

const TodoList: React.FC<Props> = ({ todos }) => {
  const { toast } = useToast();
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const handleOnChangeTodo = (task: Doc<"todos">) => {
    toggleTodo({ id: task._id, isCompleted: !task.isCompleted });
    if (!task.isCompleted) {
      toast({
        title: "✅ Task completed",
        description: "You're a rockstar",
        duration: 3000,
      });
    }
  };
  return todos.map((todo) => (
    <TaskItem
      key={todo._id}
      todo={todo}
      onChange={handleOnChangeTodo}
      showDetails
    />
  ));
};

export default TodoList;
