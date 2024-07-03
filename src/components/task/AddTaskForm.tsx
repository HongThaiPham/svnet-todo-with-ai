import React from "react";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Doc, Id } from "../../../convex/_generated/dataModel";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { CalendarIcon, Text } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import dayjs from "dayjs";
dayjs.extend(localizedFormat);
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useAction, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useToast } from "../ui/use-toast";

const FormSchema = z.object({
  taskName: z.string().min(2, {
    message: "Task name must be at least 2 characters.",
  }),
  description: z.string().optional().default(""),
  dueDate: z.date({ required_error: "A due date is required" }),
  priority: z.string().min(1, { message: "Please select a priority" }),
  projectId: z.string().min(1, { message: "Please select a Project" }),
  labelId: z.string().min(1, { message: "Please select a Label" }),
});
type Props = {
  onCancel: () => void;
  projectId: Id<"projects">;
  labelId: Id<"labels">;
  priority: string;
  parentId?: Id<"todos"> | null;
};

const AddTaskForm: React.FC<Props> = ({
  projectId,
  labelId,
  priority,
  parentId,
  onCancel,
}) => {
  const { toast } = useToast();
  const defaultValues = {
    taskName: "",
    description: "",
    priority,
    dueDate: new Date(),
    projectId,
    labelId,
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const labels = useQuery(api.labels.get) ?? [];
  const projects = useQuery(api.projects.get) ?? [];

  const createATodo = useAction(api.todos.createTodoAndEmbeddings);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { taskName, description, priority, dueDate, projectId, labelId } =
      data;

    const mutationId = await createATodo({
      taskName,
      description,
      priority: parseInt(priority),
      dueDate: dayjs(dueDate).valueOf(),
      projectId: projectId as Id<"projects">,
      labelId: labelId as Id<"labels">,
      parentId: parentId as Id<"todos"> | null,
    });
    if (mutationId !== undefined) {
      toast({
        title: "🦄 Task created successfully",
        duration: 3000,
      });
      form.reset({ ...defaultValues });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 border-2 p-2 border-gray-200 my-2 rounded-xl px-3 pt-4 border-muted"
      >
        <FormField
          control={form.control}
          name="taskName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  id="taskName"
                  type="text"
                  placeholder="Enter your Task name"
                  required
                  className="border-0 font-semibold text-lg"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-start gap-2">
                  <Text className="ml-auto h-4 w-4 opacity-50" />
                  <Textarea
                    id="description"
                    placeholder="Description"
                    className="resize-none"
                    {...field}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "flex gap-2 w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          dayjs(field.value).format("LL")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={priority}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[1, 2, 3, 4].map((item, idx) => (
                      <SelectItem key={idx} value={item.toString()}>
                        Priority {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="labelId"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={labelId || field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Label" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {labels.map((label: Doc<"labels">, idx: number) => (
                      <SelectItem key={idx} value={label._id}>
                        {label?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="projectId"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={field.onChange}
                defaultValue={projectId || field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Project" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {projects.map((project: Doc<"projects">, idx: number) => (
                    <SelectItem key={idx} value={project._id}>
                      {project?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col lg:flex-row lg:justify-between gap-2 border-t-2 pt-3">
          <div className="w-full lg:w-1/4"></div>
          <div className="flex gap-3 self-end">
            <Button variant="destructive" size="sm" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              size="sm"
              className="hover:bg-primary hover:text-white"
              type="submit"
            >
              Add Task
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default AddTaskForm;
