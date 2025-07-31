// src/components/ui/rich-text-editor.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  value: string;
  onChange: (data: string) => void;
  placeholder?: string;
  className?: string;
}

const RichTextEditor = ({ value, onChange, placeholder, className }: RichTextEditorProps) => {
  const editorRef = useRef<any>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // This effect ensures that if the initialData prop changes from outside,
  // the editor's content is updated.
  useEffect(() => {
    if (editorRef.current && editorRef.current.data.get() !== value) {
      editorRef.current.data.set(value);
    }
  }, [value]);
  
  if (!isMounted) {
    return <div>Loading Editor...</div>;
  }

  return (
    <div className={cn("prose prose-sm max-w-none [&>.ck-editor>.ck-editor__main>.ck-editor__editable]:min-h-[150px]", className)}>
        <CKEditor
            editor={ClassicEditor}
            data={value}
            onReady={editor => {
                editorRef.current = editor;
            }}
            onChange={(event, editor) => {
                const data = editor.getData();
                onChange(data);
            }}
            config={{
                placeholder: placeholder || "Start typing...",
                toolbar: [
                    'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'outdent', 'indent', '|', 'blockQuote', 'insertTable', 'undo', 'redo'
                ]
            }}
        />
    </div>
  );
};

export default RichTextEditor;
