import { Document } from "@shared/types/ipc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "phosphor-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function CreatePage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isCreatingNewDocument, mutateAsync: createDocument } =
    useMutation(
      async () => {
        const document = await window.api.createDocument();
        return document.data;
      },
      {
        onSuccess: (document) => {
          queryClient.setQueryData(
            ["documents"],
            (documents: Document[] | undefined) => {
              if (!documents) {
                return [document];
              }
              return [...documents, document];
            }
          );

          navigate(`/document/${document.id}`);
        },
      }
    );

  useEffect(() => {
    function newDocumentHandler() {
      createDocument();
    }
    const unsubscribe = window.api.onNewDocumentRequest(newDocumentHandler);

    return () => {
      unsubscribe();
    };
  }, [createDocument]);

  return (
    <button
      disabled={isCreatingNewDocument}
      className="flex w-[240px] px-5 items-center text-sm gap-2 absolute bottom-0 left-0 right-0 py-4 border-t border-rotion-600 hover:bg-rotion-700 disabled:opacity-60"
      onClick={() => createDocument()}
    >
      <Plus className="h-4 w-4" />
      Novo documento
    </button>
  );
}
