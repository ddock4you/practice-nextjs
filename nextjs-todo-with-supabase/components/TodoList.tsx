"use client";

import Todo from "./TodoItem";
import { Database } from "types_db";

interface TodoListProps {
  todos: Database["public"]["Tables"]["todo"]["Row"][];
}

export default function TodoList({ todos }: TodoListProps) {
  return (
    <div>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
