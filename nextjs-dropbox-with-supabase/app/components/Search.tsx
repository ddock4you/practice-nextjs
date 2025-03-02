"use client";

import { Input } from "@material-tailwind/react";
import { useState } from "react";

export default function Search() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Input
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      label="Search File"
      placeholder="Search File"
      icon={<i className="fa-solid fa-magnifying-glass" />}
    />
  );
}
