// src/components/ui/render-html-content.tsx
'use client';

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface RenderHtmlContentProps {
  htmlContent?: string;
}

interface ParsedItem {
  imgSrc?: string;
  name: string;
}

export function RenderHtmlContent({ htmlContent }: RenderHtmlContentProps) {
  const [items, setItems] = useState<ParsedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && htmlContent) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');
      
      const parsedItems = Array.from(doc.body.children).map(element => {
        // More robustly find the image and caption, handling CKEditor's <figure> structure
        const figure = element.tagName === 'FIGURE' ? element : element.querySelector('figure');
        const img = figure ? figure.querySelector('img') : element.querySelector('img');
        const figcaption = figure ? figure.querySelector('figcaption') : element.querySelector('figcaption');
        
        // Determine the name: use figcaption if available, otherwise use the element's text content.
        let name = (figcaption ? figcaption.textContent : element.textContent)?.trim() || '';
        
        return {
          imgSrc: img?.src,
          name: name,
        };
      }).filter(item => item.name);

      setItems(parsedItems);
    }
    setIsLoading(false);
  }, [htmlContent]);

  if (isLoading) {
    return <p className="text-muted-foreground">Loading...</p>;
  }

  if (!htmlContent || items.length === 0) {
    return <p className="text-muted-foreground">Not available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {items.map((item, index) => (
        <div key={index} className="bg-gradient-to-br from-secondary/50 to-secondary/20 rounded-lg p-4 flex flex-col items-center space-y-3 text-center transition-all duration-300">
          <Avatar className="h-16 w-16">
            {item.imgSrc && <AvatarImage src={item.imgSrc} alt={item.name} />}
            <AvatarFallback className="text-xl">
              {item.name ? item.name.charAt(0).toUpperCase() : '?'}
            </AvatarFallback>
          </Avatar>
          <span className="font-semibold text-sm text-foreground">{item.name}</span>
        </div>
      ))}
    </div>
  );
}
