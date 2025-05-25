// src/components/patient/PatientViewMode - Component for rendering patient details in 'View' Mode

import { PatientViewModeProps } from "./types";
import { PatientFormField } from "./PatientFormField";
import { formatDate, calculateAge } from "./utils";

export const PatientViewMode = ({ patient, onEdit }: PatientViewModeProps) => (
  <>
    <div className="grid grid-cols-2 gap-4">
      <PatientFormField label="Date of Birth">
        <p>{formatDate(patient.date_of_birth)}</p>
      </PatientFormField>
      <PatientFormField label="Age">
        <p>{calculateAge(patient.date_of_birth)} years old</p>
      </PatientFormField>
    </div>
    
    {patient.email && (
      <PatientFormField label="Email">
        <p>{patient.email}</p>
      </PatientFormField>
    )}
    
    {patient.phone && (
      <PatientFormField label="Phone">
        <p>{patient.phone}</p>
      </PatientFormField>
    )}
    
    {patient.address && (
      <PatientFormField label="Address">
        <p>{patient.address}</p>
      </PatientFormField>
    )}
    
    {(patient.emergency_contact_name || patient.emergency_contact_phone) && (
      <PatientFormField label="Emergency Contact">
        <p>
          {patient.emergency_contact_name} 
          {patient.emergency_contact_phone && ` - ${patient.emergency_contact_phone}`}
        </p>
      </PatientFormField>
    )}
    
    {patient.medical_conditions && (
      <PatientFormField label="Medical Conditions">
        <p className="whitespace-pre-wrap">{patient.medical_conditions}</p>
      </PatientFormField>
    )}
    
    {patient.medications && (
      <PatientFormField label="Medications">
        <p className="whitespace-pre-wrap">{patient.medications}</p>
      </PatientFormField>
    )}
    
    {patient.allergies && (
      <PatientFormField label="Allergies">
        <p className="whitespace-pre-wrap">{patient.allergies}</p>
      </PatientFormField>
    )}
    
    {(patient.insurance_provider || patient.insurance_policy_number) && (
      <PatientFormField label="Insurance">
        <p>
          {patient.insurance_provider} 
          {patient.insurance_policy_number && ` - Policy: ${patient.insurance_policy_number}`}
        </p>
      </PatientFormField>
    )}
    
    <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
      <PatientFormField label="Registered">
        <p>{formatDate(patient.created_at)}</p>
      </PatientFormField>
      <PatientFormField label="Last Updated">
        <p>{formatDate(patient.updated_at)}</p>
      </PatientFormField>
    </div>
  </>
); 