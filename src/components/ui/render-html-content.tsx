// src/components/ui/render-html-content.tsx
'use client';

import * as React from 'react';

interface RenderHtmlContentProps {
  htmlContent?: string;
}

export function RenderHtmlContent({ htmlContent }: RenderHtmlContentProps) {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <p className="text-muted-foreground">Loading...</p>;
  }

  if (!htmlContent) {
    return <p className="text-muted-foreground">Not available.</p>;
  }

  // Use dangerouslySetInnerHTML to render the HTML from the CMS
  return (
    <div
      className="prose prose-sm max-w-none text-muted-foreground text-justify"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
