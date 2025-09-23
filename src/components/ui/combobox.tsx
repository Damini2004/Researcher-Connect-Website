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
    onChange(currentValue);
    setInputValue(currentValue);
    setOpen(false);
  }

  const handleInputChange = (search: string) => {
    setInputValue(search);
  };
  
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
        // When closing, if custom values are allowed and the input value doesn't match any option,
        // we should treat it as the final value.
        if (allowCustomValue) {
            onChange(inputValue);
        }
    }
  }

  React.useEffect(() => {
    setInputValue(value || "");
  }, [value]);
  
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
                {allowCustomValue ? (
                    <CommandItem
                        key={inputValue}
                        value={inputValue}
                        onSelect={() => handleSelect(inputValue)}
                        className="cursor-pointer"
                    >
                      {`Create "${inputValue}"`}
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
