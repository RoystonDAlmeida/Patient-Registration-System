// Interface to store existing patient data from the database
export interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  email?: string; // Optional field
  phone?: string;
  address?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  medical_conditions?: string;
  medications?: string;
  allergies?: string;
  insurance_provider?: string;
  insurance_policy_number?: string;
  created_at: string;
  updated_at: string;
}

// Interface to store new incoming patient data
export interface NewPatient {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  email?: string;
  phone?: string;
  address?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  medical_conditions?: string;
  medications?: string;
  allergies?: string;
  insurance_provider?: string;
  insurance_policy_number?: string;
}