"use clinet";

import { Checkbox, IconButton } from "@material-tailwind/react";
import { useState } from "react";

export default function Todo() {
  const [isEditing, setIsEditing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [title, setTitle] = useState("");

  return (
    <div className="w-full flex item-center gap-1">
      <Checkbox checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
      {isEditing ? (
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
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
