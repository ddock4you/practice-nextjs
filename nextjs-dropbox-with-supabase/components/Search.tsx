"use client";

import { Input } from "@material-tailwind/react";

interface SearchProps {
  searchValue: any;
  setSearchValue: any;
}

export default function Search({ searchValue, setSearchValue }: SearchProps) {
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
