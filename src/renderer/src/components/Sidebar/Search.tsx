import { MagnifyingGlass } from "phosphor-react";
import { useState } from "react";
import { SearchBar } from "../SearchBar";

export function Search() {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  function handleToggleSearchBar(value: boolean) {
    setIsSearchBarOpen(value);
  }

  return (
    <>
      <button
        onClick={() => handleToggleSearchBar(true)}
        className="flex mx-5 items-center gap-2 text-rotion-100 text-sm hover:text-rotion-50"
      >
        <MagnifyingGlass className="w-5 h-5" />
        Busca rápida
      </button>
      <SearchBar onToggle={handleToggleSearchBar} open={isSearchBarOpen} />
    </>
  );
}
