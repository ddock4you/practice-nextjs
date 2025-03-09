"use client";

import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createTodo, getTodos } from "actions/todo-actions";
import TodoList from "components/TodoList";

export default function TodoForm() {
  const [searchInput, setSearchInput] = useState("");
  const todoQuery = useQuery({
    queryKey: ["todos"],
    queryFn: () => getTodos({ searchInput }),
  });
  const creteTodoMutation = useMutation({
    mutationFn: () =>
      createTodo({
        title: "New Todo",
        completed: false,
      }),
    onSuccess: () => {
      todoQuery.refetch();
    },
  });

  return (
    <div className="w-2/3 mx-auto flex flex-col items-center py-10 gap-2">
      <h1 className="text-xl">TODO LIST</h1>

      <Input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        label="Search TODO"
        placeholder="Search TODO"
        icon={<i className="fas fa-search" />}
      />
      <Button onClick={() => creteTodoMutation.mutate()} loading={creteTodoMutation.isPending}>
        <i className="fas fa-plus mr-2" />
        ADD TODO
      </Button>
      {todoQuery.isPending && <p>Loading...</p>}
      {todoQuery.isSuccess && <TodoList todos={todoQuery.data} />}
      {todoQuery.isError && <p>Error: {todoQuery.error.message}</p>}
    </div>
  );
}
