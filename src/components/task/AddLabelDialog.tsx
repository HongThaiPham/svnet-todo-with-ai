"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { useMutation } from "convex/react";
import { useState } from "react";
import { Loader, Plus, PlusIcon } from "lucide-react";
import { Id } from "../../../convex/_generated/dataModel";
import { api } from "../../../convex/_generated/api";
type Props = {};

const AddLabelDialog: React.FC<Props> = ({}) => {
  const addLabelMutation = useMutation(api.labels.createALabel);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const { toast } = useToast();
  const form = useForm();

  const onSubmit = async ({ name }: any) => {
    if (name) {
      setIsLoading(true);
      try {
        const labelId: Id<"labels"> | null = await addLabelMutation({ name });

        if (labelId != undefined) {
          // router.push(`/my-board/filter-labels/${labelId}`);

          toast({
            title: "😎 Label created successfully",
            duration: 300,
          });
          setIsLoading(false);
          setIsOpen(false);
        }
      } catch (error) {
        console.error("Error creating a label", error);
        toast({
          title: "Error creating a label",
          duration: 3000,
          variant: "destructive",
        });
        setIsLoading(false);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <PlusIcon className="h-5 w-5" aria-label="Add a Label" />
      </DialogTrigger>

      <DialogContent className="max-w-xl lg:h-56 flex flex-col md:flex-row lg:justify-between text-right">
        <DialogHeader className="w-full">
          <DialogTitle>Add a new label</DialogTitle>
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
                          placeholder="Label name"
                          required
                          className="border-0 font-semibold text-lg"
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

export default AddLabelDialog;
