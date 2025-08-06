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
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Cleanup function to avoid memory leaks
    return () => {
      setIsMounted(false);
    };
  }, []);
  
  // This effect ensures that if the initialData prop changes from outside,
  // the editor's content is updated.
  useEffect(() => {
    if (editorRef.current && editorRef.current.data.get() !== value) {
      editorRef.current.data.set(value);
    }
  }, [value]);

  const handleReady = (editor: any) => {
    editorRef.current = editor;

    // Custom upload adapter implementation
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return {
        upload: async () => {
          setIsUploading(true);
          try {
            const file = await loader.read();
            const formData = new FormData();
            formData.append('upload', file);
            
            const response = await fetch('/api/upload', {
              method: 'POST',
              body: formData,
            });

            if (!response.ok) {
              throw new Error(`Server responded with ${response.status}`);
            }

            const data = await response.json();

            if (data.error) {
              throw new Error(data.error.message);
            }
            
            return {
              default: data.url
            };

          } catch (error) {
             let message = 'Image upload failed.';
             if (error instanceof Error) {
                message = error.message;
             }
             // CKEditor's FileRepository will handle this rejection and show an error
             return Promise.reject(message);
          } finally {
            setIsUploading(false);
          }
        },
        abort: () => {
          setIsUploading(false);
          console.log('Image upload aborted.');
        },
      };
    };
  };
  
  if (!isMounted) {
    return <div>Loading Editor...</div>;
  }

  return (
    <div className={cn("prose prose-sm max-w-none relative", className)}>
        {isUploading && (
          <div className="absolute top-2 right-2 z-10 bg-secondary text-secondary-foreground text-xs font-semibold px-2 py-1 rounded-md shadow-md">
            Uploading image...
          </div>
        )}
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
