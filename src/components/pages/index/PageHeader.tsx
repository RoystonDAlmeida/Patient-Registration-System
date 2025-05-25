// src/components/pages/index/PageHeader - Header component

import { Database } from "lucide-react";
import { PageHeaderProps } from "./types";

export const PageHeader = ({ patientCount }: PageHeaderProps) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2 px-2">
        Patient Registration System
      </h1>
      <p className="text-base sm:text-lg text-gray-600 mb-4 px-2">
        Secure, local patient data management with PGlite
      </p>
      <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4" />
          <span>{patientCount} patients</span>
        </div>
      </div>
    </div>
  );
}; 