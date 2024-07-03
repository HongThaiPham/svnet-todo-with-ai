import React, { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

type Props = {
  onClick: Dispatch<SetStateAction<boolean>>;
  title: string;
};

const AddTaskButton: React.FC<Props> = ({ onClick, title }) => {
  return (
    <Button
      variant={"outline"}
      size={"sm"}
      onClick={() => onClick(true)}
      className="hover:bg-primary hover:text-white"
    >
      <Plus className="w-4 h-4 mr-2" />
      {title}
    </Button>
  );
};

export default AddTaskButton;
