"use client";

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'

interface TipTapEditorProps {
  content: string;
  onChange: (content: string) => void;
  status: "idle" | "scoring" | "analyzing" | "blocked" | "approved";
}

export function TipTapEditor({ content, onChange, status }: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start writing your essay here...",
      }),
      CharacterCount.configure({
        limit: null,
      })
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert max-w-none focus:outline-none min-h-[500px] text-foreground p-6 outline-none',
      },
    },
  });

  const getBorderColor = () => {
    switch (status) {
      case "scoring": return "border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]";
      case "analyzing": return "border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]";
      case "blocked": return "border-destructive/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]";
      case "approved": return "border-emerald-500/50 shadow-[0_0_15px_rgba(34,197,94,0.2)]";
      default: return "border-border hover:border-black/20 dark:hover:border-white/20";
    }
  };

  return (
    <div className={`rounded-xl border ${getBorderColor()} bg-white/50 dark:bg-black/40 backdrop-blur-md transition-all duration-300 overflow-hidden shadow-sm`}>
      <div className="flex items-center justify-between border-b border-border bg-black/5 dark:bg-white/5 px-4 py-3">
        <div className="flex gap-2">
          {/* Format buttons could go here */}
          <div className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">Canvas</div>
        </div>
        <div className="text-xs text-muted-foreground bg-black/5 dark:bg-black/40 px-3 py-1 rounded-full font-medium">
          {editor?.storage.characterCount?.words() || 0} / 500 words
        </div>
      </div>
      <div>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
