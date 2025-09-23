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
  const [inputValue, setInputValue] = React.useState("")

  const getLabel = (val: string) => {
    return options.find((option) => option.value.toLowerCase() === val.toLowerCase())?.label || val
  }
  
  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? "" : currentValue
    onChange(newValue)
    setInputValue("") // Clear internal input state on selection
    setOpen(false)
  }

  // When the user types in the input, update both the internal `inputValue`
  // and the external form state via `onChange`.
  const handleInputChange = (search: string) => {
    setInputValue(search);
    if (allowCustomValue) {
      onChange(search);
    }
  };

  // Ensure the input field shows the correct value from the form,
  // especially when a value is selected.
  React.useEffect(() => {
    if (value) {
      setInputValue(value);
    } else {
      setInputValue("");
    }
  }, [value]);

  const filteredOptions = allowCustomValue && inputValue && !options.some(opt => opt.label.toLowerCase() === inputValue.toLowerCase())
    ? [{ value: inputValue.toLowerCase(), label: `Create "${inputValue}"` }, ...options]
    : options;

  return (
    <Popover open={open} onOpenChange={setOpen}>
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
            <CommandEmpty>{emptyPlaceholder}</CommandEmpty>
            <CommandGroup>
                <ScrollArea className="h-48">
                    {filteredOptions.map((option) => (
                    <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={handleSelect}
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
