import { CircleCheckBig } from "lucide-react";
import React from "react";

type Props = {
  totalTodos: number;
};

const CompletedTodos: React.FC<Props> = ({ totalTodos = 0 }) => {
  return (
    <div className="flex items-center gap-1 border-b-2 p-2 border-gray-100 text-sm text-foreground[.8]">
      <CircleCheckBig />
      <span>+ {totalTodos}</span>
      <span className="capitalize">completed task</span>
    </div>
  );
};

export default CompletedTodos;
