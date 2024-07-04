"use client";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import TodoList from "@/components/to-do/TodoList";
import AddTaskWrapper from "@/components/task/AddTaskWrapper";
import CompletedTodos from "@/components/to-do/CompletedTodos";
import DeleteProject from "@/components/project/DeleteProject";
import SuggestMissingTasks from "@/components/task/SuggestMissingTasks";

type Props = {
  params: {
    projectId: Id<"projects">;
  };
};

const ProjectPage: React.FC<Props> = ({ params: { projectId } }) => {
  const project = useQuery(api.projects.getById, {
    id: projectId,
  });
  const inCompletedTodosByProject =
    useQuery(api.todos.getInCompleteTodosByProjectId, {
      projectId,
    }) ?? [];
  const completedTodosByProject =
    useQuery(api.todos.getCompletedTodosByProjectId, {
      projectId,
    }) ?? [];

  const projectTodosTotal =
    useQuery(api.todos.getTodosTotalByProjectId, {
      projectId,
    }) || 0;

  const projectName = project?.name || "";
  return (
    <div className="xl:px-40">
      <div className="flex items-center justify-between flex-wrap gap-2 lg:gap-0">
        <h1 className="text-lg font-semibold md:text-2xl">
          {projectName || "Project"}
        </h1>
        <div className="flex gap-6 lg:gap-12 items-center">
          {/* <SuggestMissingTasks projectId={projectId} /> */}
          <DeleteProject projectId={projectId} />
        </div>
      </div>
      <div className="flex flex-col gap-1 mt-4">
        <TodoList todos={inCompletedTodosByProject} />

        <div className="pb-6">
          <AddTaskWrapper projectId={projectId} />
        </div>

        <TodoList todos={completedTodosByProject} />
        <div className="flex items-center space-x-4 gap-2 border-b-2 p-2 border-gray-100 text-sm text-foreground/80">
          <CompletedTodos totalTodos={projectTodosTotal} />
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
