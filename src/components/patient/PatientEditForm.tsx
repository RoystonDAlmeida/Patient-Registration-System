// src/components/patient/PatientEditForm - Component for displaying editable patient pop up

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PatientEditFormProps } from "./types";
import { PatientFormField } from "./PatientFormField";

export const PatientEditForm = ({ editedFields, onFieldChange }: PatientEditFormProps) => (
  <>
    <div className="grid grid-cols-2 gap-4">
      <PatientFormField label="Email">
        <Input
          value={editedFields.email}
          onChange={(e) => onFieldChange('email', e.target.value)}
          placeholder="Email address"
        />
      </PatientFormField>
      <PatientFormField label="Phone">
        <Input
          value={editedFields.phone}
          onChange={(e) => onFieldChange('phone', e.target.value)}
          placeholder="Phone number"
        />
      </PatientFormField>
    </div>

    <PatientFormField label="Address">
      <Textarea
        value={editedFields.address}
        onChange={(e) => onFieldChange('address', e.target.value)}
        placeholder="Full address"
        rows={2}
      />
    </PatientFormField>

    <div className="grid grid-cols-2 gap-4">
      <PatientFormField label="Emergency Contact Name">
        <Input
          value={editedFields.emergency_contact_name}
          onChange={(e) => onFieldChange('emergency_contact_name', e.target.value)}
          placeholder="Emergency contact name"
        />
      </PatientFormField>
      <PatientFormField label="Emergency Contact Phone">
        <Input
          value={editedFields.emergency_contact_phone}
          onChange={(e) => onFieldChange('emergency_contact_phone', e.target.value)}
          placeholder="Emergency contact phone"
        />
      </PatientFormField>
    </div>

    <PatientFormField label="Medical Conditions">
      <Textarea
        value={editedFields.medical_conditions}
        onChange={(e) => onFieldChange('medical_conditions', e.target.value)}
        placeholder="Medical conditions"
        rows={2}
      />
    </PatientFormField>

    <PatientFormField label="Medications">
      <Textarea
        value={editedFields.medications}
        onChange={(e) => onFieldChange('medications', e.target.value)}
        placeholder="Current medications"
        rows={2}
      />
    </PatientFormField>

    <PatientFormField label="Allergies">
      <Textarea
        value={editedFields.allergies}
        onChange={(e) => onFieldChange('allergies', e.target.value)}
        placeholder="Known allergies"
        rows={2}
      />
    </PatientFormField>

    <div className="grid grid-cols-2 gap-4">
      <PatientFormField label="Insurance Provider">
        <Input
          value={editedFields.insurance_provider}
          onChange={(e) => onFieldChange('insurance_provider', e.target.value)}
          placeholder="Insurance provider"
        />
      </PatientFormField>
      <PatientFormField label="Insurance Policy Number">
        <Input
          value={editedFields.insurance_policy_number}
          onChange={(e) => onFieldChange('insurance_policy_number', e.target.value)}
          placeholder="Policy number"
        />
      </PatientFormField>
    </div>
  </>
); 