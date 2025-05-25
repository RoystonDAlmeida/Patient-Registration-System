// src/components/patient/types - Component for specifying interface patient props

import { Patient } from "@/types/patient";
import { UpdateablePatientFields } from "@/services/database/operations/patientOperations";

export interface PatientListProps {
  patients: Patient[];
  db: {
    getAllPatients: () => Promise<Patient[]>;
    updatePatient: (id: number, updates: UpdateablePatientFields) => Promise<Patient>;
  };
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

export interface PatientCardProps {
  patient: Patient;
  onEdit: (patient: Patient) => void;
  onView: (patient: Patient) => void;
}

export interface PatientSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export interface PatientFormFieldProps {
  label: string;
  children: React.ReactNode;
}

export interface PatientEditFormProps {
  editedFields: UpdateablePatientFields;
  onFieldChange: (field: keyof UpdateablePatientFields, value: string) => void;
}

export interface PatientViewModeProps {
  patient: Patient;
  onEdit: (patient: Patient) => void;
} 