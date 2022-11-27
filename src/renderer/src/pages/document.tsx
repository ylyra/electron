import { Document as DocumentProps } from "@shared/types/ipc";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Editor, OnContentUpdatedParams } from "../components/Editor";
import { ToC } from "../components/ToC";

export function Document() {
  const { id } = useParams<{
    id: string;
  }>();
  const { data, isFetching } = useQuery(
    ["document", id],
    async () => {
      const document = await window.api.fetchDocument({ id: id! });
      return document.data;
    },
    {
      enabled: !!id,
    }
  );
  const queryClient = useQueryClient();
  const { mutateAsync: saveDocument } = useMutation(
    async ({ content, title }: OnContentUpdatedParams) => {
      await window.api.saveDocument({
        id: id!,
        content,
        title,
      });
    },
    {
      onSuccess: (_, { content, title }) => {
        queryClient.setQueryData(["document", id], {
          ...data,
          content,
          title,
        });

        queryClient.setQueryData<DocumentProps[]>(
          ["documents"],
          (documents) => {
            if (!documents) {
              return documents;
            }

            return documents.map((document) => {
              if (document.id === id) {
                return {
                  ...document,
                  title,
                };
              }

              return document;
            });
          }
        );
      },
    }
  );

  const initialContent = useMemo(() => {
    if (data) {
      return `<h1>${data.title}</h1>${data.content ?? "<p></p>"}`;
    }

    return "";
  }, [data]);

  async function handleEditorContentUpdated({
    content,
    title,
  }: OnContentUpdatedParams) {
    await saveDocument({ content, title });
  }

  return (
    <main className="flex-1 flex py-12 px-10 gap-8">
      <aside className="hidden lg:block sticky top-0">
        <span className="text-rotion-300 font-semibold text-xs uppercase">
          Tabela de Conteúdo
        </span>

        <ToC.Root>
          <ToC.Link>Introduction</ToC.Link>
          <ToC.Section>
            <ToC.Link>Getting Started</ToC.Link>
            <ToC.Section>
              <ToC.Link>Installation</ToC.Link>
              <ToC.Link>Usage</ToC.Link>
            </ToC.Section>
          </ToC.Section>
        </ToC.Root>
      </aside>

      <section className="flex-1 flex flex-col items-center">
        {!isFetching && data && (
          <Editor
            content={initialContent}
            onContentUpdated={handleEditorContentUpdated}
          />
        )}
      </section>
    </main>
  );
}
