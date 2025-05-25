// src/services/database/operations/patientOperations - Component that includes logic for adding patient.
import { Patient } from '@/types/patient';
import { getDatabase } from '../connection';
import { syncManager } from '../sync/syncManager';

// Define the fields that can be updated
export type UpdateablePatientFields = {
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
};

export const patientOperations = {
  async addPatient(patient: Omit<Patient, 'id' | 'created_at' | 'updated_at'>) {
    const database = getDatabase(); // Get database connection object
    
    // Start a transaction
    await database.exec('BEGIN');
    
    try {
      // Get and increment the sequence
      const seqResult = await database.query(
        'UPDATE id_sequence SET last_id = last_id + 1 RETURNING last_id'
      );
      const newId = (seqResult.rows[0] as { last_id: number }).last_id;
      
      // Insert the patient with the new ID
      const result = await database.query(`
        INSERT INTO patients (
          id, first_name, last_name, date_of_birth, email, phone, address,
          emergency_contact_name, emergency_contact_phone, medical_conditions,
          medications, allergies, insurance_provider, insurance_policy_number
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        RETURNING *
      `, [
        newId,
        patient.first_name,
        patient.last_name,
        patient.date_of_birth,
        patient.email || null,
        patient.phone || null,
        patient.address || null,
        patient.emergency_contact_name || null,
        patient.emergency_contact_phone || null,
        patient.medical_conditions || null,
        patient.medications || null,
        patient.allergies || null,
        patient.insurance_provider || null,
        patient.insurance_policy_number || null
      ]);
      
      // Commit the transaction
      await database.exec('COMMIT');
      
      // Broadcast the change
      syncManager.broadcastPatientAdded(result.rows[0] as Patient);
      
      return result.rows[0];
    } catch (error) {
      // Rollback the transaction on error
      await database.exec('ROLLBACK');
      throw error;
    }
  },

  // Function for fetching patient details from database
  async getAllPatients(): Promise<Patient[]> {
    const database = getDatabase();
    const result = await database.query('SELECT * FROM patients ORDER BY id ASC');
    return result.rows as Patient[];
  },

  async executeQuery(query: string): Promise<any> {
    const database = getDatabase();
    return await database.query(query);
  },

  async updatePatient(id: number, updates: UpdateablePatientFields): Promise<Patient> {
    const database = getDatabase();
    
    // Start a transaction
    await database.exec('BEGIN');
    
    try {
      // Build the SET clause dynamically based on provided updates
      const setClause = Object.keys(updates)
        .map((key, index) => `${key} = $${index + 2}`)
        .join(', ');
      
      // Add updated_at to the SET clause
      const finalSetClause = `${setClause}, updated_at = CURRENT_TIMESTAMP`;
      
      // Build the query
      const query = `
        UPDATE patients 
        SET ${finalSetClause}
        WHERE id = $1
        RETURNING *
      `;
      
      // Execute the update
      const result = await database.query(
        query,
        [id, ...Object.values(updates)]
      );
      
      // Commit the transaction
      await database.exec('COMMIT');
      
      // Broadcast the update
      syncManager.broadcastPatientUpdated(result.rows[0] as Patient);
      
      return result.rows[0] as Patient;
    } catch (error) {
      // Rollback the transaction on error
      await database.exec('ROLLBACK');
      throw error;
    }
  }
}; 