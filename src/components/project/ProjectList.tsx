"use client";
import { useQuery } from "convex/react";
import React from "react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import { Hash } from "lucide-react";
import { Label } from "../ui/label";

type Props = {};

const ProjectList: React.FC<Props> = ({}) => {
  const projects = useQuery(api.projects.get) ?? [];
  return (
    <div className="xl:px-40">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Projects</h1>
      </div>
      <div className="flex flex-col gap-1 py-4">
        {projects?.map((project) => {
          return (
            <Link key={project._id} href={`/my-board/projects/${project._id}`}>
              <div className="flex items-center space-x-2 border-b-2 p-2 border-gray-100">
                <Hash className="text-primary w-5" />
                <Label
                  htmlFor="projects"
                  className="text-base font-normal hover:cursor-pointer"
                >
                  {project.name}
                </Label>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectList;
