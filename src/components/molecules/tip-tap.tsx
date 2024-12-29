'use client';

import Placeholder from '@tiptap/extension-placeholder';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, List, ListOrdered, Strikethrough } from 'lucide-react';
import { useEffect } from 'react';

import { Toggle } from '@/components/ui/toggle';
import { ToggleGroup } from '@/components/ui/toggle-group';

interface Props {
  val: string;
  onChange: (val: string) => void;
}

const TipTap = ({ val, onChange }: Props) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      Placeholder.configure({
        placeholder: 'Add a description for your product',
        emptyNodeClass:
          'first:before:text-gray-600 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none',
      }),
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal pl-4',
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc pl-4',
          },
        },
      }),
    ],
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();

      onChange(content);
    },
    content: val,
    editorProps: {
      attributes: {
        class:
          'min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      },
    },
  });

  useEffect(() => {
    if (editor?.isEmpty) {
      editor.commands.setContent(val);
    }
  }, [val]);

  const tiptapActions = [
    {
      key: 'bold',
      icon: Bold,
      ariaLabel: 'Toggle bold',
      value: 'bold',
      action: () => editor?.chain().focus().toggleBold().run(),
    },
    {
      key: 'italic',
      icon: Italic,
      ariaLabel: 'Toggle italic',
      value: 'italic',
      action: () => editor?.chain().focus().toggleItalic().run(),
    },
    {
      key: 'strike',
      icon: Strikethrough,
      ariaLabel: 'Toggle strike',
      value: 'strike',
      action: () => editor?.chain().focus().toggleStrike().run(),
    },
    {
      key: 'orderedList',
      icon: ListOrdered,
      ariaLabel: 'Toggle ordered list',
      value: 'orderedList',
      action: () => editor?.chain().focus().toggleOrderedList().run(),
    },
    {
      key: 'bulletList',
      icon: List,
      ariaLabel: 'Toggle bullet list',
      value: 'bulletList',
      action: () => editor?.chain().focus().toggleBulletList().run(),
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      {editor ? (
        <div className="flex justify-start border border-input bg-transparent rounded-md">
          <ToggleGroup type="multiple">
            {tiptapActions.map(
              ({ key, icon: Icon, ariaLabel, value, action }) => (
                <Toggle
                  key={key}
                  pressed={editor.isActive(value)}
                  onPressedChange={action}
                  value={value}
                  aria-label={ariaLabel}>
                  <Icon className="h-4 w-4" />
                </Toggle>
              ),
            )}
          </ToggleGroup>
        </div>
      ) : null}
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTap;
