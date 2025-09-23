// src/components/ui/keyword-input.tsx
"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Badge } from "./badge";

interface KeywordInputProps {
  placeholder?: string;
  value: string[];
  onChange: (keywords: string[]) => void;
}

export function KeywordInput({
  placeholder,
  value,
  onChange,
}: KeywordInputProps) {
  const [inputValue, setInputValue] = React.useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      const newKeywords = [...value, inputValue.trim()];
      onChange(newKeywords);
      setInputValue("");
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    const newKeywords = value.filter((keyword) => keyword !== keywordToRemove);
    onChange(newKeywords);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((keyword, index) => (
          <Badge key={index} variant="secondary">
            {keyword}
            <button
              type="button"
              className="ml-2 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onClick={() => removeKeyword(keyword)}
            >
              <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
            </button>
          </Badge>
        ))}
      </div>
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
