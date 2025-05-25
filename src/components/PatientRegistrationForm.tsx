// src/components/PatientRegistrationForm.tsx - Component for Patient Registration Form

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { NewPatient } from "@/types/patient";
import { User, Phone, Mail, MapPin, Heart, Shield } from "lucide-react";
import { FormField } from "@/components/ui/form-field";
import { FormSection } from "@/components/ui/form-section";
import {
  validateName,
  validateDateOfBirth,
  validateEmail,
  validatePhone,
  validateAddress,
} from "@/utils/validation";

interface DatabaseOperations {
  addPatient(patient: Omit<NewPatient, 'id' | 'created_at' | 'updated_at'>): Promise<any>;
}

interface PatientRegistrationFormProps {
  db: DatabaseOperations;
  onPatientRegistered: () => void;
}

const PatientRegistrationForm = ({ db, onPatientRegistered }: PatientRegistrationFormProps) => {
  const [formData, setFormData] = useState<NewPatient>({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    email: "",
    phone: "",
    address: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",
    medical_conditions: "",
    medications: "",
    allergies: "",
    insurance_provider: "",
    insurance_policy_number: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof NewPatient, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof NewPatient, string>> = {};
    
    // Required fields
    newErrors.first_name = validateName(formData.first_name, "First name");
    newErrors.last_name = validateName(formData.last_name, "Last name");
    newErrors.date_of_birth = validateDateOfBirth(formData.date_of_birth);

    // Optional fields
    newErrors.email = validateEmail(formData.email);
    newErrors.phone = validatePhone(formData.phone);
    newErrors.address = validateAddress(formData.address);
    newErrors.emergency_contact_name = validateName(formData.emergency_contact_name, "Emergency contact name");
    newErrors.emergency_contact_phone = validatePhone(formData.emergency_contact_phone);

    // Remove undefined errors
    Object.keys(newErrors).forEach(key => {
      if (!newErrors[key as keyof NewPatient]) {
        delete newErrors[key as keyof NewPatient];
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof NewPatient, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please check the form for errors.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log("Registering new patient:", formData);
      await db.addPatient(formData);

      // Reset form
      setFormData({
        first_name: "",
        last_name: "",
        date_of_birth: "",
        email: "",
        phone: "",
        address: "",
        emergency_contact_name: "",
        emergency_contact_phone: "",
        medical_conditions: "",
        medications: "",
        allergies: "",
        insurance_provider: "",
        insurance_policy_number: "",
      });
      setErrors({});

      onPatientRegistered();
      
    } catch (error) {
      console.error("Failed to register patient:", error);
      toast({
        title: "Registration Error",
        description: "Failed to register patient. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      <FormSection
        title="Basic Information"
        description="Patient's personal details"
        icon={User}
        iconColor="text-blue-600"
        className="border-blue-100"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="First Name"
            id="first_name"
            value={formData.first_name}
            onChange={(value) => handleInputChange("first_name", value)}
            placeholder="John"
            required
            error={errors.first_name}
          />
          <FormField
            label="Last Name"
            id="last_name"
            value={formData.last_name}
            onChange={(value) => handleInputChange("last_name", value)}
            placeholder="Doe"
            required
            error={errors.last_name}
          />
          <FormField
            label="Date of Birth"
            id="date_of_birth"
            type="date"
            value={formData.date_of_birth}
            onChange={(value) => handleInputChange("date_of_birth", value)}
            required
            error={errors.date_of_birth}
            max={new Date().toISOString().split('T')[0]}
          />
        </div>
      </FormSection>

      {/* Contact Information */}
      <FormSection
        title="Contact Information"
        description="How to reach the patient"
        icon={Phone}
        iconColor="text-green-600"
        className="border-green-100"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Email"
            id="email"
            type="email"
            value={formData.email}
            onChange={(value) => handleInputChange("email", value)}
            placeholder="john.doe@example.com"
            error={errors.email}
          />
          <FormField
            label="Phone Number"
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(value) => handleInputChange("phone", value)}
            placeholder="+91-1234567890"
            error={errors.phone}
          />
          <div className="md:col-span-2">
            <FormField
              label="Address"
              id="address"
              value={formData.address}
              onChange={(value) => handleInputChange("address", value)}
              placeholder="123 Linking Road, Flat 4B, Bandra West, Mumbai, Maharashtra 400050"
              isTextarea
              error={errors.address}
            />
          </div>
        </div>
      </FormSection>

      {/* Emergency Contact Section */}
      <FormSection
        title="Emergency Contact"
        description="Emergency contact information"
        icon={MapPin}
        iconColor="text-red-600"
        className="border-red-100"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Emergency Contact Name"
            id="emergency_contact_name"
            value={formData.emergency_contact_name}
            onChange={(value) => handleInputChange("emergency_contact_name", value)}
            placeholder="Jane Doe"
            error={errors.emergency_contact_name}
          />
          <FormField
            label="Emergency Contact Phone"
            id="emergency_contact_phone"
            type="tel"
            value={formData.emergency_contact_phone}
            onChange={(value) => handleInputChange("emergency_contact_phone", value)}
            placeholder="+91-1234567890"
            error={errors.emergency_contact_phone}
          />
        </div>
      </FormSection>

      <div className="flex justify-center">
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="min-w-[200px] bg-blue-600 hover:bg-blue-700"
        >
          {isSubmitting ? "Registering..." : "Register Patient"}
        </Button>
      </div>
    </form>
  );
};

export default PatientRegistrationForm;
