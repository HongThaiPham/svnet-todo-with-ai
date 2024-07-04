"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Loader, Plus, PlusIcon } from "lucide-react";
import { set, useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "../ui/button";

type Props = {};

const AddProjectDialog: React.FC<Props> = ({}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const form = useForm({ defaultValues: { name: "" } });
  const { toast } = useToast();
  const router = useRouter();

  const createAProject = useMutation(api.projects.createAProject);

  const onSubmit = async ({ name }: any) => {
    console.log("submitted", { name });
    setIsLoading(true);
    try {
      const projectId = await createAProject({ name });

      if (projectId !== undefined) {
        toast({
          title: "🚀 Project creadted successfully",
          duration: 3000,
        });
        form.reset({ name: "" });
        router.push(`/my-board/projects/${projectId}`);
        setIsOpen(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error creating a project", error);
      toast({
        title: "Error creating a project",
        duration: 3000,
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <PlusIcon className="h-5 w-5" aria-label="Add a Project" />
      </DialogTrigger>
      <DialogContent className="max-w-xl lg:h-48 flex flex-col md:flex-row lg:justify-between text-right">
        <DialogHeader className="w-full">
          <DialogTitle>Add a new project</DialogTitle>
          <DialogDescription className="capitalize">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 p-2 my-2 rounded-sm"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Project name"
                          required
                          className="border-0 font-semibold text-md"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
                <div className="flex justify-end">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <Loader className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Plus className="h-4 w-4 mr-2" />
                    )}
                    Add
                  </Button>
                </div>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddProjectDialog;
