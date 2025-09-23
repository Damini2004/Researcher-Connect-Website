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
  value: string[];
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

  const addKeyword = (keyword: string) => {
    const trimmedKeyword = keyword.trim();
    if (trimmedKeyword && !value.includes(trimmedKeyword)) {
      const newKeywords = [...value, trimmedKeyword];
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
    const newKeywords = value.filter((keyword) => keyword !== keywordToRemove);
    onChange(newKeywords);
  };
  
  const filteredSuggestions = suggestions.filter(
    (s) => s.toLowerCase().includes(inputValue.toLowerCase()) && !value.includes(s)
  );

  const isPopoverOpen = !!inputValue && filteredSuggestions.length > 0;

  return (
    <Popover open={isPopoverOpen}>
      <PopoverTrigger asChild>
        <div className="flex flex-wrap items-center gap-2 rounded-md border border-input p-2">
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
          <Input
            ref={inputRef}
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 border-0 shadow-none focus-visible:ring-0 p-0 h-auto"
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
  );
}
