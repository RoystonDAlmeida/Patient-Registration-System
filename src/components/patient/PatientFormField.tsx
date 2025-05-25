// src/components/patient/PatientFormField - Component for displaying lable and associated field

import { PatientFormFieldProps } from "./types";

export const PatientFormField = ({ label, children }: PatientFormFieldProps) => (
  <div>
    <label className="text-sm font-medium text-gray-500">{label}</label>
    {children}
  </div>
); 