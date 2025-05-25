// src/types/database.ts - Interface definition for common database operations(defined in operations/patientOperations)

export interface DatabaseOperations {
  addPatient(patient: Omit<import('./patient').Patient, 'id' | 'created_at' | 'updated_at'>): Promise<any>;
  getAllPatients(): Promise<import('./patient').Patient[]>;
  deletePatient(id: number): Promise<any>;
  updatePatient(id: number, updates: Partial<import('./patient').Patient>): Promise<any>;
  executeQuery(query: string): Promise<any>;
}