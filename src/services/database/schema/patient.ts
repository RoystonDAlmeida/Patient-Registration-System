// src/services/database/schema/patient.ts - Schema for the patient table
export const PATIENT_TABLE_SCHEMA = `
  CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    email TEXT,
    phone TEXT,
    address TEXT,
    emergency_contact_name TEXT,
    emergency_contact_phone TEXT,
    medical_conditions TEXT,
    medications TEXT,
    allergies TEXT,
    insurance_provider TEXT,
    insurance_policy_number TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

// ID_SEQUENCE_SCHEMA - Creates a table called id_sequence that maintains a counter for patient IDs
export const ID_SEQUENCE_SCHEMA = `
  CREATE TABLE IF NOT EXISTS id_sequence (
    last_id INTEGER DEFAULT 0
  );
`;

export const initializeSchema = async (db: any) => {
  await db.exec(PATIENT_TABLE_SCHEMA);
  await db.exec(ID_SEQUENCE_SCHEMA);
  
  // Initialize sequence if not exists
  const seqCheck = await db.query('SELECT COUNT(*) as count FROM id_sequence');
  if ((seqCheck.rows[0] as { count: number }).count === 0) {
    await db.exec('INSERT INTO id_sequence (last_id) VALUES (0)');
  }
}; 