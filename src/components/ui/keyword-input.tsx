// src/components/ui/keyword-input.tsx
"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { Badge } from "./badge";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Command, CommandList, CommandItem } from "./command";

interface KeywordInputProps {
  placeholder?: string;
  value: string | string[]; // Allow both string and array
  onChange: (keywords: string[]) => void;
  suggestions?: string[];
  inputValue: string;
  onInputChange: (value: string) => void;
}

export function KeywordInput({
  placeholder,
  value,
  onChange,
  suggestions = [],
  inputValue,
  onInputChange,
}: KeywordInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  
  // Ensure `currentKeywords` is always an array
  const currentKeywords = Array.isArray(value) ? value : (value ? [value] : []);

  const addKeyword = (keyword: string) => {
    const trimmedKeyword = keyword.trim();
    if (trimmedKeyword && !currentKeywords.includes(trimmedKeyword)) {
      const newKeywords = [...currentKeywords, trimmedKeyword];
      onChange(newKeywords);
    }
    onInputChange(""); // Clear input in parent form
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      addKeyword(inputValue);
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    const newKeywords = currentKeywords.filter((keyword) => keyword !== keywordToRemove);
    onChange(newKeywords);
  };
  
  const filteredSuggestions = suggestions.filter(
    (s) => s.toLowerCase().includes(inputValue.toLowerCase()) && !currentKeywords.includes(s)
  );

  const isPopoverOpen = !!inputValue && filteredSuggestions.length > 0;

  return (
    <div>
        <div className="flex flex-wrap items-center gap-2 mb-2 min-h-[20px]">
            {currentKeywords.map((keyword, index) => (
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
        <Popover open={isPopoverOpen}>
            <PopoverTrigger asChild>
                <div className="relative">
                    <Input
                        ref={inputRef}
                        placeholder={placeholder}
                        value={inputValue}
                        onChange={(e) => onInputChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                <Command>
                <CommandList>
                    {filteredSuggestions.length > 0 &&
                    filteredSuggestions.map((suggestion) => (
                        <CommandItem
                        key={suggestion}
                        onSelect={() => addKeyword(suggestion)}
                        >
                        {suggestion}
                        </CommandItem>
                    ))}
                </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    </div>
  );
}
