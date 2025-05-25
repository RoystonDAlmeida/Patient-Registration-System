// src/components/patient/PatientSearch - Component for rendering search box

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PatientSearchProps } from "./types";

export const PatientSearch = ({ searchTerm, onSearchChange }: PatientSearchProps) => (
  <div className="relative">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
    <Input
      placeholder="Search patients by name, email, or phone..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className="pl-10 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
    />
  </div>
); 