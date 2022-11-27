import { useQuery } from "@tanstack/react-query";
import { Command } from "cmdk";
import { File, MagnifyingGlass } from "phosphor-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  onToggle: (value: boolean) => void;
  open: boolean;
};

export function SearchBar({ onToggle, open }: Props) {
  const { data } = useQuery(["documents"], async () => {
    const documents = await window.api.fetchDocuments();
    return documents.data;
  });
  const navigate = useNavigate();

  function handleOpenDocument(id: string) {
    navigate(`/document/${id}`);
    onToggle(false);
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && e.metaKey) || (e.key === "k" && e.ctrlKey)) {
        onToggle(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [onToggle]);

  return (
    <Command.Dialog
      className="fixed top-24 left-1/2 -translate-x-1/2 w-[480px] max-w-full bg-rotion-800 rounded-md shadow-2xl text-rotion-100 border border-rotion-600"
      open={open}
      onOpenChange={onToggle}
      label="Search"
    >
      <div className="flex items-center gap-2 border-b border-rotion-700 p-4">
        <MagnifyingGlass className="w-5 h-5" />
        <Command.Input
          autoFocus
          placeholder="Buscar documentos..."
          className="w-full bg-transparent focus:outline-none text-sm text-rotion-50 placeholder:text-rotion-200"
        />
      </div>

      <Command.List className="py-2 max-h-48 scrollbar-thin scrollbar-thumb-rotion-600 scrollbar-track-rotion-800">
        <Command.Empty className="py-3 px-4 text-rotion-200 text-sm">
          Nenhum documento encontrado.
        </Command.Empty>

        {data?.map((document) => (
          <Command.Item
            key={document.id}
            onSelect={() => handleOpenDocument(document.id)}
            className="py-3 px-4 text-rotion-50 text-sm flex items-center gap-2 hover:bg-rotion-700 aria-selected:!bg-rotion-600"
            value={document.id}
          >
            <File className="w-4 h-4" />
            {document.title}
          </Command.Item>
        ))}
      </Command.List>
    </Command.Dialog>
  );
}
