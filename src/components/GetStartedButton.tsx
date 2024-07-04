"use client";
import { Loader, StepForward } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";

type Props = {};

const GetStartedButton: React.FC<Props> = ({}) => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="flex items-center justify-center px-8 py-4 mb-2 me-2 overflow-hidden text-xl font-medium text-gray-100 rounded-xl group bg-gradient-to-br from-purple-600 to-orange-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-blue-800"
    >
      <span className="flex items-center gap-1">
        {pending ? (
          <span className=" px-16">
            <Loader className="w-5 h-5 animate-spin" />
          </span>
        ) : (
          <>
            Get Started
            <StepForward />
          </>
        )}
      </span>
    </button>
  );
};

export default GetStartedButton;
