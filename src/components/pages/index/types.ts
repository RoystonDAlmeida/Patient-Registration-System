import { Patient } from "@/types/patient";
import { patientOperations } from "@/services/database/operations/patientOperations";

export interface PageHeaderProps {
  patientCount: number;
}

export interface TabContentProps {
  patients: Patient[];
  db: typeof patientOperations;
  setPatients: (patients: Patient[]) => void;
  onPatientRegistered: () => void;
}

export interface LoadingStateProps {
  message?: string;
  subMessage?: string;
}

export interface ErrorStateProps {
  error: string;
  onRetry: () => void;
  onRefresh: () => void;
}

export interface TabConfig {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
} 