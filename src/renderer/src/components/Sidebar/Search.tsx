import { MagnifyingGlass } from "phosphor-react";
import { useEffect, useState } from "react";
import { SearchBar } from "../SearchBar";

export function Search() {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && e.metaKey) || (e.key === "k" && e.ctrlKey)) {
        setIsSearchBarOpen((state) => !state);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setIsSearchBarOpen]);

  function handleToggleSearchBar(value?: boolean) {
    setIsSearchBarOpen((state) => {
      if (value === undefined) {
        return !state;
      }

      return value;
    });
  }

  return (
    <>
      <button
        onClick={() => handleToggleSearchBar()}
        className="flex mx-5 items-center gap-2 text-rotion-100 text-sm hover:text-rotion-50"
      >
        <MagnifyingGlass className="w-5 h-5" />
        Busca rápida
      </button>
      <SearchBar onToggle={handleToggleSearchBar} open={isSearchBarOpen} />
    </>
  );
}
