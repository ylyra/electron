import Document from "@tiptap/extension-document";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export interface OnContentUpdatedParams {
  content: string;
  title: string;
}

interface EditorProps {
  content: string;
  onContentUpdated: (props: OnContentUpdatedParams) => void;
}

export function Editor({ content, onContentUpdated }: EditorProps) {
  const editor = useEditor({
    extensions: [
      Document.extend({
        content: "heading block*",
      }),
      StarterKit.configure({
        document: false,
      }),
      Typography,
      Highlight,
      Placeholder.configure({
        placeholder: "Untitled",
        emptyEditorClass:
          "before:content-[attr(data-placeholder)] before:text-gray-500 before:h-0 before:float-left before:pointer-events-none",
      }),
    ],
    content,
    autofocus: "end",
    editorProps: {
      attributes: {
        class: "focus:outline-none prose prose-invert prose-heading-mt-0",
      },
    },
    onUpdate: ({ editor }) => {
      const contentRegex = /(<h1>(?<title>.+)<\/h1>(?<content>.+)?)/;
      const parsedContent = editor.getHTML().match(contentRegex)?.groups;

      const title = parsedContent?.title ?? "Untitled";
      const content = parsedContent?.content ?? "";

      onContentUpdated({ content, title });
    },
  });

  return <EditorContent className="w-[65ch]" editor={editor} />;
}
