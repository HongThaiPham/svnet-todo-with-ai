import React, { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

type Props = {
  onClick: Dispatch<SetStateAction<boolean>>;
};

const AddTaskButton: React.FC<Props> = ({ onClick }) => {
  return (
    <Button
      variant={"outline"}
      size={"sm"}
      onClick={() => onClick(true)}
      className="hover:bg-primary hover:text-white"
    >
      <Plus className="w-4 h-4 mr-2" />
      Add Task
    </Button>
  );
};

export default AddTaskButton;
