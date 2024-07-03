import React from "react";
import ProjectList from "@/components/ProjectList";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";

type Props = {
  params: {
    projectId: string;
  };
};

const ProjectPage: React.FC<Props> = ({ params: { projectId } }) => {
  const project = useQuery(api.projects.getById, {
    id: projectId as Id<"projects">,
  });
  return <ProjectList />;
};

export default ProjectPage;
