// src/components/pages/index/PageHeader - Header component

import { Database } from "lucide-react";
import { PageHeaderProps } from "./types";

export const PageHeader = ({ patientCount }: PageHeaderProps) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 px-2">
        Patient Pocket Ledger
      </h1>
      <p className="text-base sm:text-lg text-gray-600 mb-4 px-2">
        Secure, local patient data management with <span className="text-purple-600 font-semibold">PGlite</span>
      </p>
      <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
          <Database className="w-4 h-4 text-blue-600" />
          <span className="text-blue-700 font-medium">{patientCount} patients</span>
        </div>
      </div>
    </div>
  );
}; 