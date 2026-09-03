'use client';
import { SearchIcon } from "lucide-react";
import { useState } from "react";

interface Props {
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ placeholder = "Search...", onChange }: Props) {
  const [query, setQuery] = useState("");

  return (
    <div className="flex items-center relative md:w-[300px] rounded-full bg-gray-500/[0.1] pl-3">
      <SearchIcon size={20} strokeWidth={1}  color="currentColor" />
      <input
        className="w-full p-[10px] bg-transparent rounded-lg outline-none placeholder:text-text/[0.8]"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {setQuery(e.target.value); if (onChange) onChange(e); }}
      />
    </div>
  );
}