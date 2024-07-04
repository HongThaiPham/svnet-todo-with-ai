"use client";
import { useAction } from "convex/react";
import React, { useEffect, useState } from "react";
import { api } from "../../../../../convex/_generated/api";
import TodoList from "@/components/to-do/TodoList";

type Props = {
  params: {
    keyword: string;
  };
};

const SearchResultPage: React.FC<Props> = ({ params: { keyword } }) => {
  const [searchResults, setSearchResults] = useState<any>([]);
  const [searchInProgress, setSearchInProgress] = useState(false);
  const vectorSearch = useAction(api.search.searchTasks);
  useEffect(() => {
    const handleSearch = async () => {
      setSearchResults([]);

      setSearchInProgress(true);
      try {
        const results = await vectorSearch({
          query: keyword,
        });

        setSearchResults(results);
      } finally {
        setSearchInProgress(false);
      }
    };

    if (keyword) {
      handleSearch();
    }
  }, [keyword, vectorSearch]);

  return (
    <div className="xl:px-40">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">
          Search Results for{" "}
          <span>
            {`"`}
            {decodeURI(keyword)}
            {`"`}
          </span>
        </h1>
      </div>

      <div className="flex flex-col gap-1 py-4">
        {searchResults ? (
          <TodoList
            todos={searchResults.filter(
              (item: any) => item.isCompleted === false
            )}
          />
        ) : (
          <div>No results found</div>
        )}
      </div>
    </div>
  );
};

export default SearchResultPage;
