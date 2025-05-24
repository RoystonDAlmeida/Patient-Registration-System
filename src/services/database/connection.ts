// src/services/database/connection.ts - File for creating Pglite data storage within IndexedDB
import { PGlite } from "@electric-sql/pglite";
import { initializeSchema } from './schema/patient';

let db: PGlite | null = null;

export const initializeDatabase = async (): Promise<PGlite> => {
  if (db) return db;
  
  try {
    console.log("Initializing PGlite database...");

    // Initialize PGlite with IndexedDB persistence across tabs/windows and page refreshes
    db = new PGlite('idb://Patient_Database');
    
    // Wait for database to be ready
    await db.query('SELECT 1');
    console.log('Database connection established');

    // Initialize database schema
    await initializeSchema(db);
    
    return db;
  } catch (error) {
    console.error("Failed to initialize PGlite:", error);
    throw error;
  }
};

export const getDatabase = (): PGlite => {
  if (!db) {
    throw new Error("Database not initialized. Call initializeDatabase() first.");
  }
  return db;
}; 