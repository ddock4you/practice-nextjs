"use clinet";

import { Checkbox, IconButton } from "@material-tailwind/react";
import { useState } from "react";

export default function Todo({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [completed, setCompleted] = useState(todo.completed);
  const [title, setTitle] = useState(todo.title);

  return (
    <div className="w-full flex item-center gap-1">
      <Checkbox checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
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
        <IconButton onClick={() => setIsEditing(false)}>
          <i className="fas fa-check" />
        </IconButton>
      ) : (
        <IconButton onClick={() => setIsEditing(true)}>
          <i className="fas fa-pen" />
        </IconButton>
      )}
      <IconButton>
        <i className="fas fa-trash" />
      </IconButton>
    </div>
  );
}
