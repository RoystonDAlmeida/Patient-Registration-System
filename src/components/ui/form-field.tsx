import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  rows?: number;
  isTextarea?: boolean;
  max?: string;
}

export const FormField = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  error,
  rows = 2,
  isTextarea = false,
  max
}: FormFieldProps) => {
  const commonProps = {
    id,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    placeholder,
    required,
    className: cn(
      "border-2 outline-none",
      error ? "border-red-500" : "border-gray-300 hover:border-gray-400 focus:border-black"
    )
  };

  return (
    <div>
      <Label htmlFor={id}>
        {label}
        {required && " *"}
      </Label>
      {isTextarea ? (
        <Textarea
          {...commonProps}
          rows={rows}
        />
      ) : (
        <Input
          {...commonProps}
          type={type}
          max={max}
        />
      )}
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}; 