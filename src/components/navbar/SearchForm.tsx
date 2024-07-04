"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Search, SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type Props = {};

const SearchForm: React.FC<Props> = ({}) => {
  const form = useForm();
  const router = useRouter();

  const onSubmit = async ({ searchText }: any) => {
    console.log("submitted", { searchText });
    router.push(`/my-board/search/${searchText}`);
  };

  return (
    <Form {...form}>
      <form
        className="lg:flex lg:items-center justify-end w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="relative flex gap-2 items-center w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <FormField
            control={form.control}
            name="searchText"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    id="searchText"
                    type="search"
                    required
                    placeholder="Search tasks..."
                    className="w-full appearance-none bg-background pl-8 shadow-none h-10"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <Button className="px-4">
            <SearchIcon className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SearchForm;
