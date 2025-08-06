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

// Custom upload adapter that converts images to Base64
function Base64UploadAdapter(editor: any) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = () => {
            resolve({ default: reader.result });
          };

          reader.onerror = (error) => {
            reject(error);
          };

          reader.onabort = () => {
            reject();
          };

          loader.file.then((file: File) => {
            reader.readAsDataURL(file);
          });
        });
      },
      abort: () => {
        // This method is called when the upload is aborted.
      },
    };
  };
}


const RichTextEditor = ({ value, onChange, placeholder, className }: RichTextEditorProps) => {
  const editorRef = useRef<any>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);
  
  useEffect(() => {
    if (editorRef.current && editorRef.current.data.get() !== value) {
      editorRef.current.data.set(value);
    }
  }, [value]);

  const handleReady = (editor: any) => {
    editorRef.current = editor;
  };
  
  if (!isMounted) {
    return <div>Loading Editor...</div>;
  }

  return (
    <div className={cn("prose prose-sm max-w-none relative", className)}>
        <CKEditor
            editor={ClassicEditor}
            data={value}
            onReady={handleReady}
            onChange={(event, editor) => {
                const data = editor.getData();
                onChange(data);
            }}
            config={{
                placeholder: placeholder || "Start typing...",
                extraPlugins: [Base64UploadAdapter],
                toolbar: {
                    items: [
                        'heading', '|', 
                        'bold', 'italic', 'link', '|', 
                        'bulletedList', 'numberedList', 'outdent', 'indent', '|', 
                        'imageUpload', 'blockQuote', 'insertTable', 'mediaEmbed', '|', 
                        'undo', 'redo'
                    ],
                },
                table: {
                    contentToolbar: [
                        'tableColumn', 'tableRow', 'mergeTableCells'
                    ]
                }
            }}
        />
    </div>
  );
};

export default RichTextEditor;
