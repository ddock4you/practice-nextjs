"use clinet";

import { Checkbox, IconButton, Spinner } from "@material-tailwind/react";
import { deleteTodo, updateTodo, completeToggleTodo } from "actions/todo-actions";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "config/Providers";
import { useState } from "react";
import { Database } from "types_db";
import { convertTime } from "utils/format";

interface TodoProps {
  todo: Database["public"]["Tables"]["todo"]["Row"];
}

export default function Todo({ todo }: TodoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [completed, setCompleted] = useState(todo.completed);
  const [title, setTitle] = useState(todo.title);
  const [createdAt, setCreatedAt] = useState(todo.created_at);
  const [completedAt, setCompletedAt] = useState(todo.completed_at);

  const updateTodoMutation = useMutation({
    mutationFn: () => updateTodo({ id: todo.id, title }),
    onSuccess: () => {
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const completeToggleMutation = useMutation({
    mutationFn: () => completeToggleTodo(todo.id, completed),
    onSuccess: () => {
      console.log("completed", completed);
      setCompleted(completed);
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
          setCreatedAt(todo.created_at);
          setCompletedAt(todo.completed_at);
          completeToggleMutation.mutate();
        }}
      />
      <div className="flex-1">
        {isEditing ? (
          <input
            type="text"
            className="flex-1 border-b-black border-b pb-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your todo"
          />
        ) : (
          <p className={`flex items-center flex-1 ${completed && "line-through"}`}>{title}</p>
        )}
        <div className="flex gap-2">
          {completedAt && completed ? (
            <p>
              <span className="font-bold text-xs">완료일: </span>
              <span className="text-xs">{convertTime(completedAt)}</span>
            </p>
          ) : null}
          <p>
            <span className="font-bold  text-xs">생성일: </span>
            <span className="text-xs">{convertTime(createdAt)}</span>
          </p>
        </div>
      </div>
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
      </IconButton>
    </div>
  );
}
