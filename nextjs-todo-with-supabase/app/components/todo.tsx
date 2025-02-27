"use clinet";

import { Checkbox, IconButton, Spinner } from "@material-tailwind/react";
import { deleteTodo, updateTodo } from "actions/todo-actions";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "app/config/react-query-provider";
import { useState } from "react";
import { Todo as TodoType } from "../types/todo";

interface TodoProps {
  todo: TodoType;
}

export default function Todo({ todo }: TodoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [completed, setCompleted] = useState(todo.completed);
  const [title, setTitle] = useState(todo.title);

  const updateTodoMutation = useMutation({
    mutationFn: () => updateTodo({ id: todo.id, title, completed }),
    onSuccess: () => {
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: () => deleteTodo(todo.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <div className="w-full flex item-center gap-1">
      <Checkbox
        checked={completed}
        onChange={(e) => {
          setCompleted(e.target.checked);
          updateTodoMutation.mutate();
        }}
      />
      {isEditing ? (
        <input
          type="text"
          className="flex-1 border-b-black border-b pb-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your todo"
        />
      ) : (
        <p className={`flex-1 ${completed && "line-through"}`}>{title}</p>
      )}
      {isEditing ? (
        <IconButton onClick={async () => await updateTodoMutation.mutateAsync()}>
          {updateTodoMutation.isPending ? <Spinner /> : <i className="fas fa-check" />}
        </IconButton>
      ) : (
        <IconButton onClick={() => setIsEditing(true)}>
          <i className="fas fa-pen" />
        </IconButton>
      )}
      <IconButton onClick={async () => deleteTodoMutation.mutateAsync()}>
        {deleteTodoMutation.isPending ? <Spinner /> : <i className="fas fa-trash" />}
        <i className="fas fa-trash" />
      </IconButton>
    </div>
  );
}
