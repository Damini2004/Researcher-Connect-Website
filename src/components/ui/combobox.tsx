// src/components/ui/combobox.tsx
"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "./scroll-area"

interface ComboboxProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyPlaceholder?: string;
  allowCustomValue?: boolean;
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  searchPlaceholder = "Search...",
  emptyPlaceholder = "No results found.",
  allowCustomValue = false
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState(value || "")

  const getLabel = (val: string) => {
    return options.find((option) => option.value.toLowerCase() === val.toLowerCase())?.label || val
  }

  const handleSelect = (currentValue: string) => {
    const newValue = value === currentValue ? "" : currentValue;
    onChange(newValue);
    setInputValue(newValue);
    setOpen(false);
  }

  const handleInputChange = (search: string) => {
    setInputValue(search);
    if(allowCustomValue) {
        onChange(search);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen && allowCustomValue) {
        onChange(inputValue);
    } else if (isOpen) {
        setInputValue(value || "");
    }
  }

  const isCustomValue = allowCustomValue && inputValue && !options.some(opt => opt.value.toLowerCase() === inputValue.toLowerCase());

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? getLabel(value) : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput
            placeholder={searchPlaceholder}
            value={inputValue}
            onValueChange={handleInputChange}
          />
           <CommandList>
            <CommandEmpty>
                {isCustomValue ? (
                    <CommandItem
                        value={inputValue}
                        onSelect={() => handleSelect(inputValue)}
                    >
                        Create "{inputValue}"
                    </CommandItem>
                ) : (
                    emptyPlaceholder
                )}
            </CommandEmpty>
            <CommandGroup>
                <ScrollArea className="h-48">
                    {options.map((option) => (
                    <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={() => handleSelect(option.value)}
                    >
                        <Check
                        className={cn(
                            "mr-2 h-4 w-4",
                            value && value.toLowerCase() === option.value.toLowerCase() ? "opacity-100" : "opacity-0"
                        )}
                        />
                        {option.label}
                    </CommandItem>
                    ))}
                </ScrollArea>
            </CommandGroup>
           </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
