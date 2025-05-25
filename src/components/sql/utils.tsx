// src/components/sql/utils - Component for SQL Query Interface utiltiy functions

import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

export const formatValue = (value: any) => {
  if (value === null) return <span className="text-gray-400 italic">NULL</span>;
  if (typeof value === 'boolean') return <Badge variant={value ? "default" : "secondary"}>{value.toString()}</Badge>;
  if (typeof value === 'object') return JSON.stringify(value);
  return value.toString();
};

export const copyToClipboard = (text: string, message: string = "Copied to clipboard.") => {
  navigator.clipboard.writeText(text);
  toast({
    title: "Copied",
    description: message,
  });
};

export const sampleQueries = [
  {
    query: "SELECT * FROM patients ORDER BY created_at DESC LIMIT 10;",
    description: "Get the 10 most recently added patients"
  },
  {
    query: "SELECT COUNT(*) as total_patients FROM patients;",
    description: "Count total number of patients"
  },
  {
    query: "SELECT first_name, last_name, email FROM patients WHERE email IS NOT NULL;",
    description: "Get patients with email addresses"
  },
  {
    query: "SELECT EXTRACT(YEAR FROM AGE(date_of_birth)) as age, COUNT(*) as count FROM patients GROUP BY age ORDER BY age;",
    description: "Get patient count by age"
  },
  {
    query: "SELECT * FROM patients WHERE medical_conditions IS NOT NULL AND medical_conditions != '';",
    description: "Get patients with medical conditions"
  },
  {
    query: "SELECT insurance_provider, COUNT(*) as patient_count FROM patients WHERE insurance_provider IS NOT NULL GROUP BY insurance_provider;",
    description: "Get patient count by insurance provider"
  },
]; 