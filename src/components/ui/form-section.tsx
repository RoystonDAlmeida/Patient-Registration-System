// src/components/ui/form-section - Compoenent for various Form sections
// Sections - Basic Information, Contact Information, Emergency Contact, Medical Information, Insurance Information

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FormSectionProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  children: React.ReactNode;
  className?: string;
}

export const FormSection = ({
  title,
  description,
  icon: Icon,
  iconColor,
  children,
  className
}: FormSectionProps) => {
  return (
    <Card className={`w-full overflow-hidden border-2 ${className}`}>
      <CardHeader className="px-3 sm:px-6">
        <CardTitle className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0`} />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-0 sm:p-6">
        <div className="px-3 sm:px-6">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}; 