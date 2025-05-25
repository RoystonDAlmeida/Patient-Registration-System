// src/utils/validation.ts - Validation utility functions for Patient Registration Info

// Validation regex patterns
export const VALIDATION_PATTERNS = {
  name: /^[A-Za-z\s\-'\.]+$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[0-9]{1,4}[- ]?[0-9]{10}$/,
  insuranceProvider: /^[A-Za-z\s\-&.,]+$/,
  policyNumber: /^[A-Za-z0-9\-]+$/
};

// Validation rules
export const validateName = (value: string, fieldName: string): string | undefined => {
  if (!value.trim()) {
    return `${fieldName} is required`;
  }
  if (!VALIDATION_PATTERNS.name.test(value)) {
    return `${fieldName} should only contain letters, spaces, hyphens, apostrophes, and periods`;
  }
  if (value.trim().length < 2) {
    return `${fieldName} must be at least 2 characters long`;
  }
  return undefined;
};

export const validateDateOfBirth = (value: string): string | undefined => {
  if (!value) {
    return "Date of birth is required";
  }
  const dob = new Date(value);
  const today = new Date();
  const age = today.getFullYear() - dob.getFullYear();
  
  if (dob > today) {
    return "Date of birth cannot be in the future";
  }
  if (age > 120) {
    return "Please enter a valid date of birth";
  }
  return undefined;
};

export const validateEmail = (value: string): string | undefined => {
  if (value && !VALIDATION_PATTERNS.email.test(value)) {
    return "Please enter a valid email address";
  }
  return undefined;
};

export const validatePhone = (value: string): string | undefined => {
  if (value && !VALIDATION_PATTERNS.phone.test(value)) {
    return "Please enter a valid phone number (e.g., +91-1234567890)";
  }
  return undefined;
};

export const validateAddress = (value: string): string | undefined => {
  if (value) {
    if (value.trim().length < 5) {
      return "Address must be at least 5 characters long";
    }
    if (value.trim().length > 200) {
      return "Address is too long (maximum 200 characters)";
    }
  }
  return undefined;
};

export const validateMedicalInfo = (value: string, fieldName: string): string | undefined => {
  if (value) {
    if (value.trim().length < 3) {
      return `Please provide more details about ${fieldName} (minimum 3 characters)`;
    }
    if (value.trim().length > 500) {
      return `${fieldName} description is too long (maximum 500 characters)`;
    }
  }
  return undefined;
};

export const validateInsuranceProvider = (value: string): string | undefined => {
  if (value) {
    if (value.trim().length < 3) {
      return "Please enter a valid insurance provider name (minimum 3 characters)";
    }
    if (value.trim().length > 100) {
      return "Insurance provider name is too long (maximum 100 characters)";
    }
    if (!VALIDATION_PATTERNS.insuranceProvider.test(value)) {
      return "Insurance provider name should only contain letters, spaces, and common punctuation";
    }
  }
  return undefined;
};

export const validatePolicyNumber = (value: string): string | undefined => {
  if (value) {
    if (value.trim().length < 3) {
      return "Policy number must be at least 3 characters long";
    }
    if (value.trim().length > 20) {
      return "Policy number is too long (maximum 20 characters)";
    }
    if (!VALIDATION_PATTERNS.policyNumber.test(value)) {
      return "Policy number should only contain letters, numbers, and hyphens";
    }
  }
  return undefined;
}; 