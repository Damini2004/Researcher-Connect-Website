// src/components/ui/combobox.tsx
"use client";

import * as React from "react";
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ComboboxProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  emptyMessage?: string;
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  emptyMessage = "No results found.",
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const currentOption = options.find((option) => option.label.toLowerCase() === value.toLowerCase());

  const handleSelect = (selectedValue: string) => {
    // Find the label from the options list
    const option = options.find(opt => opt.value === selectedValue);
    onChange(option ? option.label : selectedValue);
    setOpen(false);
    setInputValue("");
  };

  const handleCreate = () => {
    onChange(inputValue);
    setOpen(false);
    setInputValue("");
  }
  
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  );
  
  const showCreateOption = inputValue && !filteredOptions.some(
    option => option.label.toLowerCase() === inputValue.toLowerCase()
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {currentOption ? currentOption.label : value || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput
            placeholder="Search or create..."
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            <CommandEmpty>
                { !showCreateOption && emptyMessage }
            </CommandEmpty>
            <CommandGroup>
                {filteredOptions.map((option) => (
                    <CommandItem
                        key={option.value}
                        value={option.label}
                        onSelect={() => handleSelect(option.value)}
                    >
                        <Check
                            className={cn(
                                "mr-2 h-4 w-4",
                                value.toLowerCase() === option.label.toLowerCase() ? "opacity-100" : "opacity-0"
                            )}
                        />
                        {option.label}
                    </CommandItem>
                ))}
                 {showCreateOption && (
                    <CommandItem
                        onSelect={handleCreate}
                        value={inputValue}
                    >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create "{inputValue}"
                    </CommandItem>
                 )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
